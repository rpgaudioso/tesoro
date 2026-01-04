import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@tesoro/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkspaceGuard, WorkspaceId } from '../auth/guards/workspace.guard';
import { CategoriesService } from './categories.service';

@Controller('categories')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(workspaceId, dto);
  }

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.categoriesService.findAll(workspaceId);
  }

  @Get(':id')
  findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.categoriesService.findOne(workspaceId, id);
  }

  @Patch(':id')
  update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(workspaceId, id, dto);
  }

  @Delete(':id')
  remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.categoriesService.remove(workspaceId, id);
  }
}
