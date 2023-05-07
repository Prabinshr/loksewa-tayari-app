import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSewaserviceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: STATUS;
  @ApiProperty()
  @IsString()
  image?: string;
}
