import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateExamQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  examCategory_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  syllabusStr: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  syllabusSubStr: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  options: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  correct_ans: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  explaination: string;
}
