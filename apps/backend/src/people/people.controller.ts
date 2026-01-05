import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePersonDto, UpdatePersonDto } from "@tesoro/shared";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard, WorkspaceId } from "../auth/guards/workspace.guard";
import { PeopleService } from "./people.service";

@Controller("people")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreatePersonDto) {
    return this.peopleService.create(workspaceId, dto);
  }

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.peopleService.findAll(workspaceId);
  }

  @Get(":id")
  findOne(@WorkspaceId() workspaceId: string, @Param("id") id: string) {
    return this.peopleService.findOne(workspaceId, id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("photo"))
  update(
    @WorkspaceId() workspaceId: string,
    @Param("id") id: string,
    @Body() dto: UpdatePersonDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    return this.peopleService.update(workspaceId, id, dto, file);
  }

  @Delete(":id")
  remove(@WorkspaceId() workspaceId: string, @Param("id") id: string) {
    return this.peopleService.remove(workspaceId, id);
  }
}
