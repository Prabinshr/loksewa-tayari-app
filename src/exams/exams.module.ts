import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { ForumService } from 'src/forum/forum.service';

@Module({
  controllers: [ExamsController],
  providers: [ExamsService, ForumService],
})
export class ExamsModule {}
