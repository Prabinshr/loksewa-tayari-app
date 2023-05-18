import { Module } from '@nestjs/common';
import { ExamsetService } from './examset.service';
import { ExamsetController } from './examset.controller';

@Module({
  controllers: [ExamsetController],
  providers: [ExamsetService]
})
export class ExamsetModule {}
