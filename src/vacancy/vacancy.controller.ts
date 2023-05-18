import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  
  @Get('np')
  findNp() {
    return this.vacancyService.getNpData();
  }
  @Get('p2')
  findP2() {
    return this.vacancyService.getp2Data();
  }
  @Get('p2/notice')
  findP2notice() {
    return this.vacancyService.getp2noticeData();
  }

  
}
