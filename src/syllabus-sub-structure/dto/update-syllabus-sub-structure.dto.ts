import { PartialType } from '@nestjs/swagger';
import { CreateSyllabusSubStructureDto } from './create-syllabus-sub-structure.dto';

export class UpdateSyllabusSubStructureDto extends PartialType(CreateSyllabusSubStructureDto) {}
