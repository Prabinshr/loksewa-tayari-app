import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Result } from '@prisma/client';

export class CreateExamProgressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  examSet_Id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_score: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_qsns: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_attempt_qsns: number;

  // Right Answer Points
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_right_qsns: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  earn_points: number;

  // Wrong Answer Points
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total_wrong_qsns: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  negative_points: number;

  // Final
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  final_score: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum({ Result })
  result: Result;
}
