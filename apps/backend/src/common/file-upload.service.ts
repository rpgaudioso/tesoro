import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FileUploadService {
  private readonly uploadDir = path.join(process.cwd(), "uploads");

  constructor() {
    // Garantir que o diretório existe
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadPersonPhoto(
    file: Express.Multer.File,
    personId: string
  ): Promise<string | null> {
    if (!file) {
      return null;
    }

    try {
      // Gerar um nome único para o arquivo
      const timestamp = Date.now();
      const random = crypto.randomBytes(8).toString("hex");
      const ext = path.extname(file.originalname);
      const filename = `person-${personId}-${timestamp}-${random}${ext}`;
      const filepath = path.join(this.uploadDir, filename);

      // Salvar o arquivo
      fs.writeFileSync(filepath, file.buffer);

      // Retornar a URL relativa
      return `/uploads/${filename}`;
    } catch (error) {
      throw new Error(`Erro ao fazer upload do arquivo: ${error.message}`);
    }
  }

  deleteFile(fileUrl: string): void {
    if (!fileUrl) return;

    try {
      // Extrair o nome do arquivo da URL
      const filename = path.basename(fileUrl);
      const filepath = path.join(this.uploadDir, filename);

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (error) {
      console.error(`Erro ao deletar arquivo: ${error.message}`);
    }
  }
}
