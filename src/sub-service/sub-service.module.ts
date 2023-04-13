import { Module } from '@nestjs/common';
import { SubServiceService } from './sub-service.service';
import { SubServiceController } from './sub-service.controller';

@Module({
  controllers: [SubServiceController],
  providers: [SubServiceService]
})
export class SubServiceModule {}
