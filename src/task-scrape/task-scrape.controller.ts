import { Controller, Get, Body } from '@nestjs/common';
import { TaskScrapeService } from './task-scrape.service';
import { CreateTaskScrapeDto } from './dto/create-task-scrape.dto';
import { UpdateTaskScrapeDto } from './dto/update-task-scrape.dto';

@Controller('task-scrape')
export class TaskScrapeController {
  constructor(private readonly taskScrapeService: TaskScrapeService) {}

  // @Get()
  // create(@Body() createTaskScrapeDto: CreateTaskScrapeDto) {
  //   return this.taskScrapeService.create(createTaskScrapeDto);
  // }
}
