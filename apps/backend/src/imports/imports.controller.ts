import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard } from "../auth/guards/workspace.guard";
import { ImportsService } from "./imports.service";

@Controller("imports")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  @Get("parsers")
  async getAvailableParsers() {
    return this.importsService.getAvailableParsers();
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadExtrato(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.uploadAndParse(workspaceId, file);
  }

  @Post()
  async create(@Req() req) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.createImportBatch(workspaceId);
  }

  @Get(":id")
  async getBatch(@Req() req, @Param("id") id: string) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.getBatch(workspaceId, id);
  }

  @Get(":id/preview")
  async getPreview(@Req() req, @Param("id") id: string) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.getPreview(workspaceId, id);
  }

  @Patch(":batchId/rows/:rowId")
  async updateRow(
    @Req() req,
    @Param("batchId") batchId: string,
    @Param("rowId") rowId: string,
    @Body()
    data: {
      confirmed?: boolean;
      categoryId?: string;
      personId?: string;
    }
  ) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.updateImportRow(
      workspaceId,
      batchId,
      rowId,
      data
    );
  }

  @Post(":id/confirm")
  async confirm(
    @Req() req,
    @Param("id") id: string,
    @Body() body: { accountId?: string; cardId?: string }
  ) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.confirm(
      workspaceId,
      id,
      body.accountId,
      body.cardId
    );
  }

  @Delete(":id")
  async delete(@Req() req, @Param("id") id: string) {
    const workspaceId = req.headers["x-workspace-id"];
    return this.importsService.deleteImportBatch(workspaceId, id);
  }
}
