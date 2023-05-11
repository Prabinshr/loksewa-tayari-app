import { PartialType } from '@nestjs/swagger';
import { CreateExamsetDto } from './create-examset.dto';

export class UpdateExamsetDto extends PartialType(CreateExamsetDto) {}
