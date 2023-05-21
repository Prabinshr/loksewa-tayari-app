import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GorkhaPatraService } from './gorkha-patra.service';
import { CreateGorkhaPatraDto } from './dto/create-gorkha-patra.dto';
import { UpdateGorkhaPatraDto } from './dto/update-gorkha-patra.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('gorkhaPatra')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('gorkhapatra')
export class GorkhaPatraController {
  constructor(private readonly gorkhaPatraService: GorkhaPatraService) {}
  @Get('news')
  @Roles(Role.USER)
  async scrapeAllData() {
    const allData = await this.gorkhaPatraService.scrapeNews();
    return allData;
  }
}
