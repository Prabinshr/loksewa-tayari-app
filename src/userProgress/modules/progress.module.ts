import { Module } from '@nestjs/common';
import { UserProgressController } from '../controllers/progress.controller';
import { UserProgressService } from '../services/progress.service';
import { UserExamProgressController } from '../controllers/exam-progress.controller';
import { UserExamProgressService } from '../services/exam-progress.services';

@Module({
  controllers: [UserProgressController, UserExamProgressController],
  providers: [UserProgressService, UserExamProgressService],
})
export class UserProgressModule {}
