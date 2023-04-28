import { PartialType } from '@nestjs/swagger';
import { CreateSubserviceHasSyllabusDto } from './create-subservice-has-syllabus.dto';

export class UpdateSubserviceHasSyllabusDto extends PartialType(CreateSubserviceHasSyllabusDto) {}
