import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from 'src/notification/notification.service';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('vacancy')
@Public()
@Controller('vacancy')
export class VacancyController {
  constructor(
    private readonly vacancyService: VacancyService,
    private notification: NotificationService,
  ) {}

  //endpooint to hit all the other endpoints to scrape data at once
  //for future automation-cronjob
  // @Get('all')
  // async scrapeAllData() {
  //   const allData = await this.vacancyService.scrapeAllData();
  //   return allData;
  // }
  //
  // @Get('all')
  // async scrapeAllData() {
  //   const allData = await this.vacancyService.scrapeAllData();
  //   return allData;
  // }

  @Get('np')
  findNp(@Query('type') type: string) {
    return this.vacancyService.getNpData(type);
  }

  @Get('p2')
  async findP2(@Query('type') type: string) {
    return this.vacancyService.getp2DataAdvertising(type);
  }

  @Get('p2/notice')
  async findP2notice(@Query('type') type: string) {
    return this.vacancyService.getp2noticeData(type);
  }

  @Get('bagmati')
  async getBagmati(@Query() type: string) {
    return this.vacancyService.getBagmati(type);
  }

  @Get('bagmati/notices')
  async getBagmatiNotices(@Query() type: string) {
    return this.vacancyService.getBagmatiNotices(type);
  }

  // @Post('bagmati/promotion')
  // async postBagmatiPromotion() {
  //   return this.vacancyService.postBagmatiPromotion();
  // }
  //
  // @Get('bagmati/promotion')
  // async getBagmatiPromotion(@Query() type:string) {
  //   return this.vacancyService.getBagmatiPromotion(type);
  // }

  @Get('karnali')
  async getKarnali(@Query() type: string) {
    return this.vacancyService.getKarnali(type);
  }

  @Get('karnali/notices')
  async getKarnaliNotices(@Query() type: string) {
    return this.vacancyService.getKarnaliNotices(type);
  }

  @Get('gandaki')
  async getGandaki(@Query() type: string) {
    return this.vacancyService.getGandaki(type);
  }

  @Get('gandaki/notices')
  async getGandakiNotices(@Query() type: string) {
    return this.vacancyService.getGandakiNotices(type);
  }

  @Get('p1')
  async getPradeshOne(@Query() type: string) {
    return this.vacancyService.getPradeshOne(type);
  }

  @Get('p1/notices')
  async getPradeshOneNotices(@Query() type: string) {
    return this.vacancyService.getPradeshOneNotices(type);
  }

  // @Get('pradesh5')
  // async scrapePradeshPach() {
  //   return this.vacancyService.scrapePradeshPach();
  // }

  // @Get('sudurpaschim')
  // async scrapeSudurpaschim() {
  //   return this.vacancyService.scrapeSudurpaschim();
  // }
}
