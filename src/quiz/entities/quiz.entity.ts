
import {ApiProperty} from '@nestjs/swagger'
import {Question} from '../../question/entities/question.entity'
import {QuizCategory} from '../../quizCategory/entities/quizCategory.entity'
import {Transaction} from '../../transaction/entities/transaction.entity'
import {UserProgress} from '../../userProgress/entities/userProgress.entity'


export class Quiz {
  id: string ;
name: string ;
category_id: string  | null;
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
Question?: Question[] ;
category?: QuizCategory  | null;
Transaction?: Transaction[] ;
User_Progress?: UserProgress[] ;
}
