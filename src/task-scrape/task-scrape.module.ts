import { Module } from '@nestjs/common';
import { TaskScrapeService } from './task-scrape.service';
import { TaskScrapeController } from './task-scrape.controller';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [TaskScrapeController],
  providers: [TaskScrapeService, NotificationService],
})
export class TaskScrapeModule {}
