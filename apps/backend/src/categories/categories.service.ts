import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        workspaceId,
        ...dto,
      },
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.category.findMany({
      where: { workspaceId },
      orderBy: { name: "asc" },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.category.findFirst({
      where: { id, workspaceId },
    });
  }

  async update(workspaceId: string, id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(workspaceId: string, id: string) {
    // Verificar se há transações associadas a esta categoria
    const transactionsCount = await this.prisma.transaction.count({
      where: { categoryId: id },
    });

    if (transactionsCount > 0) {
      throw new BadRequestException(
        `Não é possível excluir esta categoria pois existem ${transactionsCount} lançamento(s) associado(s). Remova a categoria desses lançamentos antes de excluí-la.`
      );
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
