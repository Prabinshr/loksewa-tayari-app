import { Module } from '@nestjs/common';
import { SubStrTopicService } from './sub-str-topic.service';
import { SubStrTopicController } from './sub-str-topic.controller';

@Module({
  controllers: [SubStrTopicController],
  providers: [SubStrTopicService]
})
export class SubStrTopicModule {}
