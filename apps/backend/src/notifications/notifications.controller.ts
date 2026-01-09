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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WorkspaceGuard } from "../auth/guards/workspace.guard";
import { NotificationsService } from "./notifications.service";

@Controller("workspaces/:workspaceId/notifications")
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Param("workspaceId") workspaceId: string, @Body() body: any) {
    return this.notificationsService.create({
      workspaceId,
      type: body.type,
      title: body.title,
      message: body.message,
      data: body.data,
    });
  }

  @Get()
  async findAll(
    @Param("workspaceId") workspaceId: string,
    @Query("limit") limit?: string
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : 50;
    return this.notificationsService.findAll(workspaceId, limitNumber);
  }

  @Get("unread")
  async findUnread(@Param("workspaceId") workspaceId: string) {
    return this.notificationsService.findUnread(workspaceId);
  }

  @Get("unread/count")
  async countUnread(@Param("workspaceId") workspaceId: string) {
    const count = await this.notificationsService.countUnread(workspaceId);
    return { count };
  }

  @Patch(":id/read")
  async markAsRead(
    @Param("workspaceId") workspaceId: string,
    @Param("id") id: string
  ) {
    return this.notificationsService.markAsRead(id, workspaceId);
  }

  @Patch("read-all")
  async markAllAsRead(@Param("workspaceId") workspaceId: string) {
    return this.notificationsService.markAllAsRead(workspaceId);
  }

  @Delete(":id")
  async delete(
    @Param("workspaceId") workspaceId: string,
    @Param("id") id: string
  ) {
    return this.notificationsService.delete(id, workspaceId);
  }
}
