import { Module } from '@nestjs/common';
import { QuestionSetService } from './question-set.service';
import { QuestionSetController } from './question-set.controller';

@Module({
  controllers: [QuestionSetController],
  providers: [QuestionSetService]
})
export class QuestionSetModule {}
