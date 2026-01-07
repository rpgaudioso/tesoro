import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateTransactionDto, UpdateTransactionDto } from "@tesoro/shared";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard, WorkspaceId } from "../auth/guards/workspace.guard";
import { TransactionsService } from "./transactions.service";

@Controller("transactions")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(
    @WorkspaceId() workspaceId: string,
    @Body() dto: CreateTransactionDto
  ) {
    return this.transactionsService.create(workspaceId, dto);
  }

  @Get()
  findAll(
    @WorkspaceId() workspaceId: string,
    @Query("month") month?: string,
    @Query("year") year?: string,
    @Query("categoryId") categoryId?: string,
    @Query("personId") personId?: string,
    @Query("accountId") accountId?: string,
    @Query("type") type?: string
  ) {
    return this.transactionsService.findAll(workspaceId, {
      month,
      year,
      categoryId,
      personId,
      accountId,
      type,
    });
  }

  @Get(":id")
  findOne(@WorkspaceId() workspaceId: string, @Param("id") id: string) {
    return this.transactionsService.findOne(workspaceId, id);
  }

  @Patch(":id")
  update(
    @WorkspaceId() workspaceId: string,
    @Param("id") id: string,
    @Body() dto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(workspaceId, id, dto);
  }

  @Delete(":id")
  remove(@WorkspaceId() workspaceId: string, @Param("id") id: string) {
    return this.transactionsService.remove(workspaceId, id);
  }
}
