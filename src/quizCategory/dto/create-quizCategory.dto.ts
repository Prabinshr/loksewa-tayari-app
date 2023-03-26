
import {Type} from 'class-transformer'
import {IsNotEmpty,IsString} from 'class-validator'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateQuizCategoryDto {
  @ApiProperty()
@IsNotEmpty()
@IsString()
name: string;
}
