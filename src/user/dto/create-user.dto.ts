import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  middle_name?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;
}
