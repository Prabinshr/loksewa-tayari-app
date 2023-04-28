import { Module } from '@nestjs/common';
import { SyllabusSubStructureService } from './syllabus-sub-structure.service';
import { SyllabusSubStructureController } from './syllabus-sub-structure.controller';

@Module({
  controllers: [SyllabusSubStructureController],
  providers: [SyllabusSubStructureService]
})
export class SyllabusSubStructureModule {}
