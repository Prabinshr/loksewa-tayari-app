import { Module } from '@nestjs/common';
import { QuizCategoryService } from './quiz_category.service';
import { QuizCategoryController } from './quiz_category.controller';

@Module({
  controllers: [QuizCategoryController],
  providers: [QuizCategoryService]
})
export class QuizCategoryModule {}
