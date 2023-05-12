import { ApiProperty } from '@nestjs/swagger';
import { LEVEL } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExamsetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  level: LEVEL;

  @ApiProperty()
  @IsNumber()
  negative_mark_value: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subService_id: string;
}
