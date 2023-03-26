
import {ApiProperty} from '@nestjs/swagger'


export class QuestionDto {
  id: string ;
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
}
