
import {ApiProperty} from '@nestjs/swagger'
import {Quiz} from '../../quiz/entities/quiz.entity'
import {User} from '../../user/entities/user.entity'


export class Transaction {
  id: string ;
user_id: string ;
quiz_id: string ;
@ApiProperty({
  type: `integer`,
  format: `int32`,
})
amount: number ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
transaction_date: Date ;
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
