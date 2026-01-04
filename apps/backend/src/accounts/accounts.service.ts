import { Injectable } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from '@tesoro/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        workspaceId,
        ...dto,
      },
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.account.findMany({
      where: { workspaceId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.account.findFirst({
      where: { id, workspaceId },
    });
  }

  async update(workspaceId: string, id: string, dto: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data: dto,
    });
  }

  async remove(workspaceId: string, id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
