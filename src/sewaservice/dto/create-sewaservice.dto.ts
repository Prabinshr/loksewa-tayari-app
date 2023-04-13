import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSewaserviceDto {
  @IsNotEmpty()
  @IsString()
  description : string
  @IsNotEmpty()
  @IsString()
  status : STATUS
}
