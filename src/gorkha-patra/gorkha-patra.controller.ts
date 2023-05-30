import { Controller, Get } from '@nestjs/common';
import { GorkhaPatraService } from './gorkha-patra.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('gorkhaPatra')
@Public()
@Controller('gorkhapatra')
export class GorkhaPatraController {
  constructor(private readonly gorkhaPatraService: GorkhaPatraService) {}

  @Get('news')
  async scrapeAllData() {
    return await this.gorkhaPatraService.scrapeNews();
  }
}
