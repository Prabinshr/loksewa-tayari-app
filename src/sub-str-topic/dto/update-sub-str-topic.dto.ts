import { PartialType } from '@nestjs/swagger';
import { CreateSubStrTopicDto } from './create-sub-str-topic.dto';

export class UpdateSubStrTopicDto extends PartialType(CreateSubStrTopicDto) {}
