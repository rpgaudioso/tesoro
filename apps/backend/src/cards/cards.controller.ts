import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCardDto, CreatePurchaseDto, UpdateCardDto } from '@tesoro/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkspaceGuard, WorkspaceId } from '../auth/guards/workspace.guard';
import { CardsService } from './cards.service';

@Controller('cards')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreateCardDto) {
    return this.cardsService.create(workspaceId, dto);
  }

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.cardsService.findAll(workspaceId);
  }

  @Get(':id')
  findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.cardsService.findOne(workspaceId, id);
  }

  @Patch(':id')
  update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCardDto,
  ) {
    return this.cardsService.update(workspaceId, id, dto);
  }

  @Delete(':id')
  remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.cardsService.remove(workspaceId, id);
  }

  @Get(':id/statement')
  getStatement(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Query('month') month: string,
  ) {
    return this.cardsService.getStatement(workspaceId, id, month);
  }

  @Post(':id/purchases')
  createPurchase(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body() dto: CreatePurchaseDto,
  ) {
    return this.cardsService.createPurchase(workspaceId, id, dto);
  }
}
