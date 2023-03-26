
import {ApiProperty} from '@nestjs/swagger'
import {Quiz} from '../../quiz/entities/quiz.entity'
import {QuestionCategory} from '../../questionCategory/entities/questionCategory.entity'


export class Question {
  id: string ;
quiz_id: string  | null;
text: string ;
correct_answer: string ;
answer_explanation: string  | null;
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
options: string[] ;
quiz?: Quiz  | null;
Question_Category?: QuestionCategory  | null;
question_CategoryId: string  | null;
}
