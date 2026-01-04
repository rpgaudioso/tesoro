import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkspaceGuard, WorkspaceId } from '../auth/guards/workspace.guard';
import { ImportsService } from './imports.service';

@Controller('imports')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class ImportsController {
  constructor(private importsService: ImportsService) {}

  @Post()
  createBatch(@WorkspaceId() workspaceId: string) {
    return this.importsService.createBatch(workspaceId);
  }

  @Get(':id')
  getBatch(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.importsService.getBatch(workspaceId, id);
  }

  @Get(':id/preview')
  getPreview(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.importsService.getPreview(workspaceId, id);
  }

  @Post(':id/confirm')
  confirm(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.importsService.confirm(workspaceId, id);
  }
}
