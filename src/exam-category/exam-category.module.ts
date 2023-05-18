import { Module } from '@nestjs/common';
import { ExamCategoryController } from './exam-category.controller';
import { ExamCategoryService } from './exam-category.service';


@Module({
  controllers: [ExamCategoryController],
  providers: [ExamCategoryService],
})
export class ExamCategoryModule {}
