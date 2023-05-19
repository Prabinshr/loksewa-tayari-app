import { PartialType } from '@nestjs/swagger';
import { CreateGorkhaPatraDto } from './create-gorkha-patra.dto';

export class UpdateGorkhaPatraDto extends PartialType(CreateGorkhaPatraDto) {}
