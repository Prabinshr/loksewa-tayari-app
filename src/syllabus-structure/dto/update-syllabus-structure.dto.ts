import { PartialType } from '@nestjs/swagger';
import { CreateSyllabusStructureDto } from './create-syllabus-structure.dto';

export class UpdateSyllabusStructureDto extends PartialType(CreateSyllabusStructureDto) {}
