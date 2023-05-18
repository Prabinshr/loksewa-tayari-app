import { Module } from '@nestjs/common';
import { ExamQuestionService } from './exam-question.service';
import { ExamQuestionController } from './exam-question.controller';

@Module({
  controllers: [ExamQuestionController],
  providers: [ExamQuestionService]
})
export class ExamQuestionModule {}
