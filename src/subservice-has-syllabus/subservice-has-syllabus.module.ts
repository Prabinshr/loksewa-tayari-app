import { Module } from '@nestjs/common';
import { SubserviceHasSyllabusService } from './subservice-has-syllabus.service';
import { SubserviceHasSyllabusController } from './subservice-has-syllabus.controller';

@Module({
  controllers: [SubserviceHasSyllabusController],
  providers: [SubserviceHasSyllabusService]
})
export class SubserviceHasSyllabusModule {}
