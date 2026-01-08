import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard, WorkspaceId } from "../auth/guards/workspace.guard";
import { RecurringTransactionsService } from "./recurring-transactions.service";

@Controller("recurring-transactions")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class RecurringTransactionsController {
  constructor(
    private readonly recurringTransactionsService: RecurringTransactionsService
  ) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() createDto: any) {
    return this.recurringTransactionsService.create(workspaceId, createDto);
  }

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.recurringTransactionsService.findAll(workspaceId);
  }

  @Get(":id")
  findOne(@WorkspaceId() workspaceId: string, @Param("id") id: string) {
    return this.recurringTransactionsService.findOne(workspaceId, id);
  }

  @Put(":id")
  update(
    @WorkspaceId() workspaceId: string,
    @Param("id") id: string,
    @Body() updateDto: any
  ) {
    return this.recurringTransactionsService.update(workspaceId, id, updateDto);
  }

  @Delete(":id")
  remove(@WorkspaceId() workspaceId: string, @Param("id") id: string) {
    return this.recurringTransactionsService.remove(workspaceId, id);
  }
}
