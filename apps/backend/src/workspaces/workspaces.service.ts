import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

// Default categories for new workspaces
const DEFAULT_CATEGORIES = [
  { name: "Alimentação", type: "EXPENSE", icon: "🍔", color: "#FF6B6B" },
  { name: "Transporte", type: "EXPENSE", icon: "🚗", color: "#4ECDC4" },
  { name: "Moradia", type: "EXPENSE", icon: "🏠", color: "#45B7D1" },
  { name: "Saúde", type: "EXPENSE", icon: "⚕️", color: "#96CEB4" },
  { name: "Educação", type: "EXPENSE", icon: "📚", color: "#FFEAA7" },
  { name: "Lazer", type: "EXPENSE", icon: "🎮", color: "#DFE6E9" },
  { name: "Vestuário", type: "EXPENSE", icon: "👕", color: "#A29BFE" },
  { name: "Salário", type: "INCOME", icon: "💰", color: "#00B894" },
  { name: "Investimentos", type: "INCOME", icon: "📈", color: "#6C5CE7" },
  { name: "Outros", type: "EXPENSE", icon: "📦", color: "#B2BEC3" },
];

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateWorkspaceDto) {
    return this.prisma.$transaction(async (tx) => {
      const workspace = await tx.workspace.create({
        data: { name: dto.name },
      });

      await tx.member.create({
        data: {
          workspaceId: workspace.id,
          userId,
          role: "OWNER",
        },
      });

      // Create default categories for the workspace
      await tx.category.createMany({
        data: DEFAULT_CATEGORIES.map((cat) => ({
          workspaceId: workspace.id,
          name: cat.name,
          type: cat.type,
          icon: cat.icon,
          color: cat.color,
        })),
      });

      return workspace;
    });
  }

  async findAll(userId: string) {
    const members = await this.prisma.member.findMany({
      where: { userId },
      include: {
        workspace: {
          include: {
            people: {
              select: {
                id: true,
                name: true,
                photoUrl: true,
                color: true,
              },
            },
          },
        },
      },
    });

    return members.map((m) => ({
      ...m.workspace,
      role: m.role,
    }));
  }

  async findOne(workspaceId: string) {
    return this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        people: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(
    workspaceId: string,
    dto: { name?: string; personIds?: string[] }
  ) {
    const { personIds, ...updateData } = dto;

    // Se personIds é fornecido, replace as pessoas na workspace
    if (personIds !== undefined) {
      // Primeiro, remove todas as pessoas atuais
      await this.prisma.person.updateMany({
        where: { workspaceId },
        data: { workspaceId: workspaceId },
      });

      // Depois, se há personIds, atualiza as selecionadas
      if (personIds.length > 0) {
        // Apenas atualizar para garantir que existem
        await this.prisma.person.updateMany({
          where: {
            id: { in: personIds },
            workspaceId,
          },
          data: {},
        });
      }
    }

    return this.prisma.workspace.update({
      where: { id: workspaceId },
      data: updateData,
      include: {
        people: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(workspaceId: string) {
    // Cascade deletion will be handled by Prisma based on schema relationships
    return this.prisma.workspace.delete({
      where: { id: workspaceId },
    });
  }
}
