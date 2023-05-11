import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSubServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sewaService_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsUrl()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  status: STATUS;

  @ApiProperty()
  @IsString()
  @IsOptional()
  package_title?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
