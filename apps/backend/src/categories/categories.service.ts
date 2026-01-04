import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@tesoro/shared';
import { PrismaService } from '../prisma/prisma.service';

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
      orderBy: { name: 'asc' },
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
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
