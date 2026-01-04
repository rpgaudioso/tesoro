import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ImportsService {
  constructor(private prisma: PrismaService) {}

  async createBatch(workspaceId: string) {
    return this.prisma.importBatch.create({
      data: {
        workspaceId,
        status: "CREATED",
      },
    });
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
      batchId: batch.id,
      status: batch.status,
      rows: batch.rows,
      pendingCount: batch.rows.filter((r) => !r.confirmed).length,
      confirmedCount: batch.rows.filter((r) => r.confirmed).length,
    };
  }

  async confirm(workspaceId: string, batchId: string) {
    const batch = await this.prisma.importBatch.findFirst({
      where: { id: batchId, workspaceId },
      include: { rows: true },
    });

    if (!batch) {
      throw new NotFoundException("Batch not found");
    }

    const confirmedRows = batch.rows.filter((r) => r.confirmed);

    // Create transactions from confirmed rows
    await Promise.all(
      confirmedRows.map((row) => {
        if (!row.suggestedCategoryId) {
          throw new Error("Category is required for import");
        }

        return this.prisma.transaction.create({
          data: {
            workspaceId,
            date: row.date,
            description: row.description,
            amount: row.amount,
            type: row.type,
            categoryId: row.suggestedCategoryId,
            personId: row.suggestedPersonId || undefined,
          },
        });
      })
    );

    // Update batch status
    await this.prisma.importBatch.update({
      where: { id: batchId },
      data: { status: "CONFIRMED" },
    });

    return { success: true, imported: confirmedRows.length };
  }
}
