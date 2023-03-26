
import {Type} from 'class-transformer'
import {ArrayNotEmpty,IsArray,IsNotEmpty,IsOptional,IsString} from 'class-validator'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateQuestionDto {
  @ApiProperty()
@IsNotEmpty()
@IsString()
text: string;
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
}
