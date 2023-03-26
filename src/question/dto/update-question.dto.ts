
import {Type} from 'class-transformer'
import {ArrayNotEmpty,IsArray,IsOptional,IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateQuestionDto {
  @ApiProperty()
@IsOptional()
@IsString()
text?: string;
@ApiProperty()
@IsOptional()
@IsString()
correct_answer?: string;
@ApiProperty()
@IsOptional()
@IsString()
answer_explanation?: string;
@ApiProperty()
@IsOptional()
@IsArray()
@ArrayNotEmpty()
options?: string[];
}
