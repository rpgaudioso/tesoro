import { Module } from "@nestjs/common";
import { FileUploadService } from "../common/file-upload.service";
import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, FileUploadService],
  exports: [PeopleService],
})
export class PeopleModule {}
