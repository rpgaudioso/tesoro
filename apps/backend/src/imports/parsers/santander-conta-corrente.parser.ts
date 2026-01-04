import { BankParser, ParsedTransaction } from "./types";

export class SantanderContaCorrenteParser implements BankParser {
  name = "Santander Conta Corrente";

  detectFormat(data: any[][]): boolean {
    // Verifica se a primeira linha contém "EXTRATO DE CONTA CORRENTE"
    if (!data || data.length < 6) return false;
    const firstRow = data[0];
    return (
      firstRow && firstRow[0]?.toString().includes("EXTRATO DE CONTA CORRENTE")
    );
  }

  parse(data: any[][]): ParsedTransaction[] {
    const transactions: ParsedTransaction[] = [];

    // Encontrar a linha de cabeçalho (Data, Descrição, etc.)
    let headerIndex = -1;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (
        row &&
        row[0]?.toString().trim() === "Data" &&
        row[1]?.toString().includes("Descrição")
      ) {
        headerIndex = i;
        break;
      }
    }

    if (headerIndex === -1) {
      throw new Error("Formato de extrato não reconhecido");
    }

    // Processar linhas após o cabeçalho
    for (let i = headerIndex + 1; i < data.length; i++) {
      const row = data[i];

      // Parar ao encontrar linha de totais ou vazia
      if (!row || !row[0] || row[0]?.toString().trim() === "TOTAL") {
        break;
      }

      // Ignorar linha de saldo anterior
      if (row[1]?.toString().includes("SALDO ANTERIOR")) {
        continue;
      }

      const dateStr = row[0]?.toString().trim();
      const description = row[1]?.toString().trim();
      const creditStr = row[4]?.toString().trim();
      const debitStr = row[5]?.toString().trim();

      // Validar se tem data válida (formato DD/MM/YYYY)
      if (!dateStr || !dateStr.match(/^\d{2}\/\d{2}\/\d{4}/)) {
        continue;
      }

      // Parse da data (DD/MM/YYYY)
      const [day, month, year] = dateStr.split("/").map((n) => parseInt(n));
      const date = new Date(year, month - 1, day);

      // Determinar o valor e tipo
      let amount = 0;
      let type: "INCOME" | "EXPENSE" = "EXPENSE";

      if (creditStr && creditStr !== "") {
        // Crédito (entrada)
        amount = this.parseAmount(creditStr);
        type = "INCOME";
      } else if (debitStr && debitStr !== "") {
        // Débito (saída)
        amount = Math.abs(this.parseAmount(debitStr));
        type = "EXPENSE";
      } else {
        continue; // Pular linhas sem valor
      }

      if (amount === 0) continue;

      transactions.push({
        date,
        description: description || "Sem descrição",
        amount,
        type,
        document: row[2]?.toString().trim(),
        rawData: {
          docto: row[2]?.toString().trim(),
          situacao: row[3]?.toString().trim(),
          saldo: row[6]?.toString().trim(),
        },
      });
    }

    return transactions;
  }

  private parseAmount(value: string): number {
    if (!value) return 0;

    // Remove espaços e converte vírgula para ponto
    // Formato: "1.202,68" ou "-1.202,68" ou "6.892,01"
    const cleaned = value
      .replace(/\s/g, "")
      .replace(/\./g, "") // Remove pontos de milhar
      .replace(",", ".") // Converte vírgula decimal para ponto
      .replace(/[^\d.-]/g, ""); // Remove outros caracteres

    return parseFloat(cleaned) || 0;
  }
}
