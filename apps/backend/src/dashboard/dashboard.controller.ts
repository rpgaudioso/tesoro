import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard, WorkspaceId } from "../auth/guards/workspace.guard";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboard(
    @WorkspaceId() workspaceId: string,
    @Query("month") month: string
  ) {
    // Default to current month if not provided
    if (!month) {
      const now = new Date();
      month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    }

    return this.dashboardService.getDashboard(workspaceId, month);
  }

  @Get("yearly-balance")
  getYearlyBalance(
    @WorkspaceId() workspaceId: string,
    @Query("lastYear") lastYear?: string
  ) {
    return this.dashboardService.getYearlyBalance(
      workspaceId,
      lastYear === "true"
    );
  }

  @Get("last-12-months")
  getLast12Months(@WorkspaceId() workspaceId: string) {
    return this.dashboardService.getLast12MonthsBalance(workspaceId);
  }
}
