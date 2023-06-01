import { PartialType } from '@nestjs/swagger';
import { CreateTaskScrapeDto } from './create-task-scrape.dto';

export class UpdateTaskScrapeDto extends PartialType(CreateTaskScrapeDto) {}
