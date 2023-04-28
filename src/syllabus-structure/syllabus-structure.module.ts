import { Module } from '@nestjs/common';
import { SyllabusStructureService } from './syllabus-structure.service';
import { SyllabusStructureController } from './syllabus-structure.controller';

@Module({
  controllers: [SyllabusStructureController],
  providers: [SyllabusStructureService]
})
export class SyllabusStructureModule {}
