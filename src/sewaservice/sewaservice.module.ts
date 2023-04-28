import { Module } from '@nestjs/common';
import { SewaserviceService } from './sewaservice.service';
import { SewaserviceController } from './sewaservice.controller';

@Module({
  controllers: [SewaserviceController],
  providers: [SewaserviceService]
})
export class SewaserviceModule {}
