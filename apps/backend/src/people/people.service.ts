import { Injectable } from '@nestjs/common';
import { CreatePersonDto, UpdatePersonDto } from '@tesoro/shared';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, dto: CreatePersonDto) {
    return this.prisma.person.create({
      data: {
        workspaceId,
        ...dto,
      },
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.person.findMany({
      where: { workspaceId },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.person.findFirst({
      where: { id, workspaceId },
    });
  }

  async update(workspaceId: string, id: string, dto: UpdatePersonDto) {
    return this.prisma.person.update({
      where: { id },
      data: dto,
    });
  }

  async remove(workspaceId: string, id: string) {
    return this.prisma.person.delete({
      where: { id },
    });
  }
}
