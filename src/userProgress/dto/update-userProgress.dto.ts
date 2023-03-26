
import {Type} from 'class-transformer'
import {IsInt,IsNumber,IsOptional} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateUserProgressDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
@IsOptional()
@IsInt()
score?: number;
@ApiProperty({
  type: `number`,
  format: `float`,
})
@IsOptional()
@IsNumber()
negative_score?: number;
}
