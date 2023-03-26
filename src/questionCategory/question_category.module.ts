import { Module } from '@nestjs/common';
import { QuestionCategoryController } from './question_category.controller';
import { QuestionCategoryService } from './question_category.service';

@Module({
  controllers: [QuestionCategoryController],
  providers: [QuestionCategoryService]
})
export class QuestionCategoryModule {}
