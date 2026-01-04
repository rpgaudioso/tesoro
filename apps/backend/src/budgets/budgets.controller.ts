import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateBudgetsDto } from '@tesoro/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkspaceGuard, WorkspaceId } from '../auth/guards/workspace.guard';
import { BudgetsService } from './budgets.service';

@Controller('budgets')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class BudgetsController {
  constructor(private budgetsService: BudgetsService) {}

  @Get(':month')
  findByMonth(@WorkspaceId() workspaceId: string, @Param('month') month: string) {
    return this.budgetsService.findByMonth(workspaceId, month);
  }

  @Put(':month')
  updateBudgets(
    @WorkspaceId() workspaceId: string,
    @Param('month') month: string,
    @Body() dto: UpdateBudgetsDto,
  ) {
    return this.budgetsService.updateBudgets(workspaceId, month, dto);
  }
}
