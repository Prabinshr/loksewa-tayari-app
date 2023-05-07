import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  question_CategoryId?: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  quiz_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  answer_explanation?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  options: string[];

  @ApiProperty()
  @IsNotEmpty()
  qsn_set_id: string;
}
