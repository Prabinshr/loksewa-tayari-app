
import {Type} from 'class-transformer'
import {IsNotEmpty,IsString} from 'class-validator'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateQuestionCategoryDto {
  @ApiProperty()
@IsNotEmpty()
@IsString()
name: string;
}
