import { PartialType } from '@nestjs/swagger';
import { CreateSewaserviceDto } from './create-sewaservice.dto';

export class UpdateSewaserviceDto extends PartialType(CreateSewaserviceDto) {}
