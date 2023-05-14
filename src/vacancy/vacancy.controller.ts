import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';


@ApiTags('vacancy')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get('bagmati')
  @Roles(Role.USER)
  async scrapeBagmati() {
    return this.vacancyService.scrapeBagmati();
  }

  @Get('bagmati/promotion')
  @Roles(Role.USER)
  async scrapeBagmatiPromotion() {
    return this.vacancyService.scrapeBagmatiPromotion();
  }

  @Get('karnali')
  @Roles(Role.USER)
  async scrapeKarnali() {
    return this.vacancyService.scrapeKarnali();
  }
  @Get('karnali/noticeboard')
  @Roles(Role.USER)
  async scrapeKarnaliNotices() {
    return this.vacancyService.scrapeKarnaliNotices();
  }
  // @Get('sudurpaschim')
  // @Roles(Role.USER)
  // async scrapeSudurpaschim() {
  //   return this.vacancyService.scrapeSudurpaschim();
  // }
}
