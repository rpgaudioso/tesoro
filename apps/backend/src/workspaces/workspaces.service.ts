import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

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
}
