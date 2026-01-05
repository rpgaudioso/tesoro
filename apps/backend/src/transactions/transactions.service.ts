import { Injectable } from "@nestjs/common";
import { CreateTransactionDto, UpdateTransactionDto } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, dto: CreateTransactionDto) {
    const date = typeof dto.date === "string" ? new Date(dto.date) : dto.date;

    return this.prisma.transaction.create({
      data: {
        workspaceId,
        date,
        description: dto.description,
        amount: dto.amount,
        type: dto.type,
        categoryId: dto.categoryId,
        accountId: dto.accountId,
        cardId: dto.cardId,
        personId: dto.personId,
      },
      include: {
        category: true,
        account: true,
        card: true,
        person: true,
      },
    });
  }

  async findAll(
    workspaceId: string,
    filters: {
      month?: string;
      categoryId?: string;
      personId?: string;
      accountId?: string;
      cardId?: string;
      type?: string;
    }
  ) {
    const where: any = { workspaceId };

    if (filters.month) {
      const startDate = new Date(`${filters.month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.personId) where.personId = filters.personId;
    if (filters.accountId) where.accountId = filters.accountId;
    if (filters.cardId) where.cardId = filters.cardId;
    if (filters.type) where.type = filters.type;

    return this.prisma.transaction.findMany({
      where,
      include: {
        category: true,
        account: true,
        card: true,
        person: true,
      },
      orderBy: { date: "desc" },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.transaction.findFirst({
      where: { id, workspaceId },
      include: {
        category: true,
        account: true,
        card: true,
        person: true,
      },
    });
  }

  async update(workspaceId: string, id: string, dto: UpdateTransactionDto) {
    const data: any = { ...dto };

    if (dto.date) {
      data.date = typeof dto.date === "string" ? new Date(dto.date) : dto.date;
    }

    return this.prisma.transaction.update({
      where: { id },
      data,
      include: {
        category: true,
        account: true,
        card: true,
        person: true,
      },
    });
  }

  async remove(workspaceId: string, id: string) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
