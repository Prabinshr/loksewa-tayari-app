import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { type } from 'os';
import { NotificationService } from 'src/notification/notification.service';

@ApiTags('vacancy')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('vacancy')
export class VacancyController {
  constructor(
    private readonly vacancyService: VacancyService,
    private notification: NotificationService,
  ) {}

  //endpooint to hit all the other endpoints to scrape data at once
  //for future automation-cronjob
  // @Get('all')
  // @Roles(Role.USER)
  // async scrapeAllData() {
  //   const allData = await this.vacancyService.scrapeAllData();
  //   return allData;
  // }
  // @Get('all')

  // @Roles(Role.USER)
  // async scrapeAllData() {
  //   const allData = await this.vacancyService.scrapeAllData();
  //   return allData;
  // }

  @Get('np')
  @Roles(Role.USER)
  findNp(@Query('type') type: string) {
    return this.vacancyService.getNpData(type);
  }

  @Get('p2')
  @Roles(Role.USER)
  async findP2(@Query('type') type: string) {
    return this.vacancyService.getp2DataAdvertising(type);
    
  }

  @Get('p2/notice')
  @Roles(Role.USER)
  async findP2notice(@Query('type') type: string) {
    return  this.vacancyService.getp2noticeData(type);
    
  }

  @Get('bagmati')
  @Roles(Role.USER)
  async getBagmati(@Query() type: string) {
    return this.vacancyService.getBagmati(type);
  }

  @Get('bagmati/notices')
  @Roles(Role.USER)
  async getBagmatiNotices(@Query() type: string) {
    return this.vacancyService.getBagmatiNotices(type);
  }

  // @Post('bagmati/promotion')
  // @Roles(Role.USER)
  // async postBagmatiPromotion() {
  //   return this.vacancyService.postBagmatiPromotion();
  // }
  // @Get('bagmati/promotion')
  // @Roles(Role.USER)
  // async getBagmatiPromotion(@Query() type:string) {
  //   return this.vacancyService.getBagmatiPromotion(type);
  // }

  @Get('karnali')
  @Roles(Role.USER)
  async getKarnali(@Query() type: string) {
    return this.vacancyService.getKarnali(type);
  }

  @Get('karnali/notices')
  @Roles(Role.USER)
  async getKarnaliNotices(@Query() type: string) {
    return this.vacancyService.getKarnaliNotices(type);
  }

  @Get('gandaki')
  @Roles(Role.USER)
  async getGandaki(@Query() type: string) {
    return this.vacancyService.getGandaki(type);
  }

  @Get('gandaki/notices')
  @Roles(Role.USER)
  async getGandakiNotices(@Query() type: string) {
    return this.vacancyService.getGandakiNotices(type);
  }

  @Get('p1')
  @Roles(Role.USER)
  async getPradeshOne(@Query() type: string) {
    return this.vacancyService.getPradeshOne(type);
  }

  @Get('p1/notices')
  @Roles(Role.USER)
  async getPradeshOneNotices(@Query() type: string) {
    return this.vacancyService.getPradeshOneNotices(type);
  }

  // @Get('pradesh5')
  // @Roles(Role.USER)
  // async scrapePradeshPach() {
  //   return this.vacancyService.scrapePradeshPach();
  // }

  // @Get('sudurpaschim')
  // @Roles(Role.USER)
  // async scrapeSudurpaschim() {
  //   return this.vacancyService.scrapeSudurpaschim();
  // }
}
