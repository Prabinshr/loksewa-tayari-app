import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Result } from '@prisma/client';

export class UpdateExamProgressDto {
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
  @IsOptional()
  total_score?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  total_qsns?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  total_attempt_qsns?: number;

  // Right Answer Points
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  total_right_qsns?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  earn_points?: number;

  // Wrong Answer Points
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  total_wrong_qsns?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  negative_points?: number;

  // Final
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  final_score?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  result?: Result;
}
