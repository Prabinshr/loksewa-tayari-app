import { Module } from '@nestjs/common';
import { UserProgressController } from './progress.controller';
import { UserProgressService } from './progress.service';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService]
})
export class UserProgressModule {}
