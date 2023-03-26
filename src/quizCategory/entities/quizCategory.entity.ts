
import {ApiProperty} from '@nestjs/swagger'
import {Quiz} from '../../quiz/entities/quiz.entity'


export class QuizCategory {
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
quizzes?: Quiz[] ;
}
