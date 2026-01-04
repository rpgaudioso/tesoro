import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as XLSX from "xlsx";
import { PrismaService } from "../prisma/prisma.service";
import { ParsedTransaction, ParserFactory } from "./parsers";

@Injectable()
export class ImportsService {
  constructor(private prisma: PrismaService) {}

  async createImportBatch(workspaceId: string) {
    return this.prisma.importBatch.create({
      data: {
        workspaceId,
        status: "CREATED",
      },
    });
  }

  async uploadAndParse(
    workspaceId: string,
    file: Express.Multer.File
  ): Promise<{
    batchId: string;
    parserName: string;
    transactionsCount: number;
  }> {
    try {
      // Ler arquivo Excel
      const workbook = XLSX.read(file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Detectar parser e processar
      const { parser, transactions } = ParserFactory.parseData(data as any[][]);

      // Criar batch de importação
      const batch = await this.prisma.importBatch.create({
        data: {
          workspaceId,
          status: "PARSED",
        },
      });

      // Obter categorias para sugestão automática
      const categories = await this.prisma.category.findMany({
        where: { workspaceId },
      });

      // Criar linhas de importação
      await Promise.all(
        transactions.map((transaction) =>
          this.prisma.importedRow.create({
            data: {
              batchId: batch.id,
              date: transaction.date,
              description: transaction.description,
              amount: transaction.amount,
              type: transaction.type,
              document: transaction.document,
              suggestedCategoryId: this.suggestCategory(
                transaction,
                categories
              ),
              confirmed: false,
            },
          })
        )
      );

      return {
        batchId: batch.id,
        parserName: parser.name,
        transactionsCount: transactions.length,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || "Erro ao processar arquivo de extrato"
      );
    }
  }

  private suggestCategory(
    transaction: ParsedTransaction,
    categories: Array<{ id: string; name: string }>
  ): string | null {
    const description = transaction.description.toLowerCase();

    // Mapeamento simples de palavras-chave para categorias
    const mappings = {
      alimentação: [
        "mercado",
        "supermercado",
        "restaurante",
        "ifood",
        "pizzaria",
        "lanche",
      ],
      transporte: [
        "uber",
        "99",
        "posto",
        "gasolina",
        "combustivel",
        "estacionamento",
      ],
      saúde: [
        "farmacia",
        "drogaria",
        "hospital",
        "clinica",
        "medico",
        "plano de saude",
      ],
      moradia: [
        "aluguel",
        "condominio",
        "luz",
        "agua",
        "gas",
        "energia",
        "light",
        "cedae",
      ],
      lazer: ["cinema", "netflix", "spotify", "youtube", "show", "teatro"],
    };

    for (const [categoryName, keywords] of Object.entries(mappings)) {
      if (keywords.some((keyword) => description.includes(keyword))) {
        const category = categories.find(
          (c) => c.name.toLowerCase() === categoryName
        );
        if (category) return category.id;
      }
    }

    // Retorna primeira categoria do tipo apropriado como fallback
    return categories[0]?.id || null;
  }

  async getBatch(workspaceId: string, batchId: string) {
    return this.prisma.importBatch.findFirst({
      where: { id: batchId, workspaceId },
      include: { rows: true },
    });
  }

  async getPreview(workspaceId: string, batchId: string) {
    const batch = await this.prisma.importBatch.findFirst({
      where: { id: batchId, workspaceId },
      include: { rows: true },
    });

    if (!batch) {
      throw new NotFoundException("Batch not found");
    }

    return {
      id: batch.id,
      fileName: "extrato.xlsx",
      importType: "Santander",
      status: batch.status,
      createdAt: batch.createdAt,
      rows: batch.rows.map((row) => ({
        id: row.id,
        date: row.date,
        description: row.description,
        amount: row.amount,
        type: row.type,
        document: row.document,
        suggestedCategoryId: row.suggestedCategoryId,
        categoryId: row.categoryId,
        personId: row.personId,
        confirmed: row.confirmed,
      })),
      _count: {
        pendingRows: batch.rows.filter((r) => !r.confirmed).length,
        confirmedRows: batch.rows.filter((r) => r.confirmed).length,
      },
    };
  }

  async updateImportRow(
    workspaceId: string,
    batchId: string,
    rowId: string,
    data: {
      confirmed?: boolean;
      categoryId?: string;
      personId?: string;
    }
  ) {
    console.log('🔄 Backend - updateImportRow:', { rowId, data });
    
    // Verificar se o batch pertence ao workspace
    const batch = await this.prisma.importBatch.findFirst({
      where: { id: batchId, workspaceId },
    });

    if (!batch) {
      throw new NotFoundException("Batch not found");
    }

    const updated = await this.prisma.importedRow.update({
      where: { id: rowId },
      data: {
        confirmed: data.confirmed,
        categoryId: data.categoryId,
        personId: data.personId,
      },
    });
    
    console.log('✅ Backend - Linha atualizada:', { 
      id: updated.id, 
      categoryId: updated.categoryId,
      confirmed: updated.confirmed 
    });
    
    return updated;
  }

  async confirm(
    workspaceId: string,
    batchId: string,
    accountId?: string,
    cardId?: string
  ) {
    const batch = await this.prisma.importBatch.findFirst({
      where: { id: batchId, workspaceId },
      include: { rows: true },
    });

    if (!batch) {
      throw new NotFoundException("Batch not found");
    }

    const confirmedRows = batch.rows.filter((r) => r.confirmed);

    if (confirmedRows.length === 0) {
      throw new BadRequestException(
        "Nenhuma transação confirmada para importar"
      );
    }

    // Criar transações a partir das linhas confirmadas
    const createdTransactions = await Promise.all(
      confirmedRows.map((row) => {
        const categoryId = row.categoryId || row.suggestedCategoryId;
        
        if (!categoryId) {
          throw new BadRequestException(
            `Categoria é obrigatória para a transação: ${row.description}`
          );
        }

        return this.prisma.transaction.create({
          data: {
            workspaceId,
            date: row.date,
            description: row.description,
            amount: row.amount,
            type: row.type,
            categoryId: categoryId,
            accountId: accountId || undefined,
            cardId: cardId || undefined,
            personId: row.personId || row.suggestedPersonId || undefined,
          },
        });
      })
    );

    // Atualizar status do batch
    await this.prisma.importBatch.update({
      where: { id: batchId },
      data: { status: "CONFIRMED" },
    });

    return {
      success: true,
      imported: createdTransactions.length,
      transactions: createdTransactions,
    };
  }

  async deleteImportBatch(workspaceId: string, batchId: string) {
    const batch = await this.prisma.importBatch.findFirst({
      where: { id: batchId, workspaceId },
    });

    if (!batch) {
      throw new NotFoundException("Batch not found");
    }

    await this.prisma.importBatch.delete({
      where: { id: batchId },
    });

    return { deleted: true };
  }

  async getAvailableParsers() {
    return ParserFactory.getAvailableParsers();
  }
}
