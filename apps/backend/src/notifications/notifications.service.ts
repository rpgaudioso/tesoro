import { Injectable } from "@nestjs/common";
import { NotificationType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

interface CreateNotificationDto {
  workspaceId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
}

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        workspaceId: dto.workspaceId,
        type: dto.type,
        title: dto.title,
        message: dto.message,
        data: dto.data || {},
      },
    });
  }

  async findAll(workspaceId: string, limit = 50) {
    return this.prisma.notification.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async findUnread(workspaceId: string) {
    return this.prisma.notification.findMany({
      where: {
        workspaceId,
        isRead: false,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async countUnread(workspaceId: string) {
    return this.prisma.notification.count({
      where: {
        workspaceId,
        isRead: false,
      },
    });
  }

  async markAsRead(id: string, workspaceId: string) {
    return this.prisma.notification.update({
      where: {
        id,
        workspaceId,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(workspaceId: string) {
    return this.prisma.notification.updateMany({
      where: {
        workspaceId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  async delete(id: string, workspaceId: string) {
    return this.prisma.notification.delete({
      where: {
        id,
        workspaceId,
      },
    });
  }
}
