
import {ApiProperty} from '@nestjs/swagger'


export class QuizDto {
  id: string ;
name: string ;
@ApiProperty({
  type: `number`,
  format: `float`,
})
cost: number ;
@ApiProperty({
  type: `number`,
  format: `float`,
})
negative_mark_value: number  | null;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
updatedAt: Date ;
}
