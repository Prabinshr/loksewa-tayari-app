import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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
  @IsUrl()
  image?: string;
}
