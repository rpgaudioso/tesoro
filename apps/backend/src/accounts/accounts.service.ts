import { Injectable } from "@nestjs/common";
import { CreateAccountDto, UpdateAccountDto } from "@tesoro/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    workspaceId: string,
    dto: CreateAccountDto & { personIds?: string[] }
  ) {
    const { personIds, ...accountData } = dto;

    return this.prisma.account.create({
      data: {
        workspaceId,
        ...accountData,
        people:
          personIds && personIds.length > 0
            ? {
                create: personIds.map((personId) => ({
                  personId,
                })),
              }
            : undefined,
      },
      include: {
        people: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.account.findMany({
      where: { workspaceId },
      include: {
        people: {
          include: {
            person: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.account.findFirst({
      where: { id, workspaceId },
      include: {
        people: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async update(
    workspaceId: string,
    id: string,
    dto: UpdateAccountDto & { personIds?: string[] }
  ) {
    const { personIds, ...accountData } = dto;

    // Delete existing associations if personIds is provided
    if (personIds) {
      await this.prisma.accountPerson.deleteMany({
        where: { accountId: id },
      });
    }

    return this.prisma.account.update({
      where: { id },
      data: {
        ...accountData,
        people:
          personIds && personIds.length > 0
            ? {
                create: personIds.map((personId) => ({
                  personId,
                })),
              }
            : undefined,
      },
      include: {
        people: {
          include: {
            person: true,
          },
        },
      },
    });
  }

  async remove(workspaceId: string, id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
