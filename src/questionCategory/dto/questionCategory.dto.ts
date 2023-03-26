
import {ApiProperty} from '@nestjs/swagger'


export class QuestionCategoryDto {
  id: string ;
name: string ;
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
