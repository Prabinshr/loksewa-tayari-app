
import {Type} from 'class-transformer'
import {IsInt,IsNotEmpty,IsNumber} from 'class-validator'
import {ApiProperty,getSchemaPath} from '@nestjs/swagger'




export class CreateUserProgressDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
@IsNotEmpty()
@IsInt()
score: number;
@ApiProperty({
  type: `number`,
  format: `float`,
})
@IsNotEmpty()
@IsNumber()
negative_score: number;
}
