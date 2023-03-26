
import {ApiProperty} from '@nestjs/swagger'
import {Quiz} from '../../quiz/entities/quiz.entity'
import {User} from '../../user/entities/user.entity'


export class UserProgress {
  id: string ;
user_id: string ;
quiz_id: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
score: number ;
@ApiProperty({
  type: `number`,
  format: `float`,
})
negative_score: number ;
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
quiz?: Quiz ;
user?: User ;
}
