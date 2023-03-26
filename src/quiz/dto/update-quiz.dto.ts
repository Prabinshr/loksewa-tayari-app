
import {Type} from 'class-transformer'
import {IsNumber,IsOptional,IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateQuizDto {
  @ApiProperty()
@IsOptional()
@IsString()
name?: string;
@ApiProperty({
  type: `number`,
  format: `float`,
  default: 0,
})
@IsOptional()
@IsNumber()
negative_mark_value?: number;
}
