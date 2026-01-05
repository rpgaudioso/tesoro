import { Injectable } from "@nestjs/common";
import { CreatePersonDto, UpdatePersonDto } from "@tesoro/shared";
import { FileUploadService } from "../common/file-upload.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PeopleService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService
  ) {}

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
      orderBy: { name: "asc" },
    });
  }

  async findOne(workspaceId: string, id: string) {
    return this.prisma.person.findFirst({
      where: { id, workspaceId },
    });
  }

  async update(
    workspaceId: string,
    id: string,
    dto: UpdatePersonDto,
    file?: Express.Multer.File
  ) {
    let photoUrl: string | null | undefined = undefined;

    // Buscar a pessoa atual para verificar se há foto anterior
    const currentPerson = await this.prisma.person.findUnique({
      where: { id },
    });

    // Se removePhoto for true, deletar a foto atual
    if (dto.removePhoto && currentPerson?.photoUrl) {
      this.fileUploadService.deleteFile(currentPerson.photoUrl);
      photoUrl = null;
    }

    // Se há um arquivo, fazer upload e obter a URL
    if (file) {
      // Se a pessoa tinha uma foto antiga, deletar
      if (currentPerson?.photoUrl) {
        this.fileUploadService.deleteFile(currentPerson.photoUrl);
      }
      photoUrl = await this.fileUploadService.uploadPersonPhoto(file, id);
    }

    const updateData: any = { ...dto };
    delete updateData.removePhoto; // Remover do DTO antes de salvar

    // Atualizar photoUrl se necessário
    if (dto.removePhoto) {
      updateData.photoUrl = null;
    } else if (file) {
      updateData.photoUrl = photoUrl;
    }

    return this.prisma.person.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(workspaceId: string, id: string) {
    // Buscar a pessoa para deletar sua foto se houver
    const person = await this.prisma.person.findUnique({
      where: { id },
    });

    if (person?.photoUrl) {
      this.fileUploadService.deleteFile(person.photoUrl);
    }

    return this.prisma.person.delete({
      where: { id },
    });
  }
}
