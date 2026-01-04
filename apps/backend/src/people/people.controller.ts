import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatePersonDto, UpdatePersonDto } from '@tesoro/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WorkspaceGuard, WorkspaceId } from '../auth/guards/workspace.guard';
import { PeopleService } from './people.service';

@Controller('people')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreatePersonDto) {
    return this.peopleService.create(workspaceId, dto);
  }

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.peopleService.findAll(workspaceId);
  }

  @Get(':id')
  findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.peopleService.findOne(workspaceId, id);
  }

  @Patch(':id')
  update(
    @WorkspaceId() workspaceId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePersonDto,
  ) {
    return this.peopleService.update(workspaceId, id, dto);
  }

  @Delete(':id')
  remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.peopleService.remove(workspaceId, id);
  }
}
