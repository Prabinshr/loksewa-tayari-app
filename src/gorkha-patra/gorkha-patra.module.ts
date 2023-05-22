import { Module } from '@nestjs/common';
import { GorkhaPatraService } from './gorkha-patra.service';
import { GorkhaPatraController } from './gorkha-patra.controller';

@Module({
  controllers: [GorkhaPatraController],
  providers: [GorkhaPatraService]
})
export class GorkhaPatraModule {}
