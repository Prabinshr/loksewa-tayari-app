
import {ApiProperty} from '@nestjs/swagger'
import {Question} from '../../question/entities/question.entity'


export class QuestionCategory {
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
quizzes?: Question[] ;
}
