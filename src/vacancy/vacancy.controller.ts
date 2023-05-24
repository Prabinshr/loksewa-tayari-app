import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Get('all')
  @ApiOperation({summary:"get all "})
  findall(@Query() type: string) {
    return this.vacancyService.getNpData(type);
  }
  @Get('np')
  @ApiOperation({summary:"type = psc "})
  findNp(@Query('type') type: string) {
    return this.vacancyService.getNpData(type);
  }

  @Get('p2')
  @ApiOperation({summary:"type = p2advertising "})  
  async findP2(@Query('type') type: string) {
    return this.vacancyService.getp2DataAdvertising(type);
    
  }

  @Get('p2/notice')
  @ApiOperation({summary:"type = p2advertising "}) 
  async findP2notice(@Query('type') type: string) {
    return  this.vacancyService.getp2noticeData(type);
    
  }

  @Get('bagmati')
  @ApiOperation({summary:"type = bagmati "}) 
  async getBagmati(@Query('type') type: string) {
    return this.vacancyService.getBagmati(type);
  }

  @Get('bagmati/notices')
  @ApiOperation({summary:"type = bagmatiNotice "}) 
  async getBagmatiNotices(@Query('type') type: string) {
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
  @ApiOperation({summary:"type = karnaliVacancy "}) 
  async getKarnali(@Query('type') type: string) {
    return this.vacancyService.getKarnali(type);
  }

  @Get('karnali/notices')
  @ApiOperation({summary:"type = karnaliNotice "}) 
  async getKarnaliNotices(@Query('type') type: string) {
    return this.vacancyService.getKarnaliNotices(type);
  }

  @Get('gandaki')
  @ApiOperation({summary:"type = gandakiAdvertisment "}) 
  async getGandaki(@Query('type') type: string) {
    return this.vacancyService.getGandaki(type);
  }

  @Get('gandaki/notices')
  @ApiOperation({summary:"type = gandakiNotice "}) 
  async getGandakiNotices(@Query('type') type: string) {
    return this.vacancyService.getGandakiNotices(type);
  }

  @Get('p1')
  @ApiOperation({summary:"type = p1AdvertiseNotice "}) 
  async getPradeshOne(@Query('type') type: string) {
    return this.vacancyService.getPradeshOne(type);
  }

  @Get('p1/notices')
  @ApiOperation({summary:"type = p1GeneralNotice "}) 
  async getPradeshOneNotices(@Query('type') type: string) {
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
