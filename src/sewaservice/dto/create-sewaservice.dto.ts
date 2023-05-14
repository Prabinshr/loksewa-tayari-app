import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSewaserviceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: STATUS;
  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;
}
