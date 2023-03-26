
import {ApiProperty} from '@nestjs/swagger'
import {Transaction} from '../../transaction/entities/transaction.entity'
import {UserProgress} from '../../userProgress/entities/userProgress.entity'
import {Otp} from '../../otp/entities/otp.entity'


export class User {
  id: string ;
username: string ;
email: string ;
type: string ;
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
transactions?: Transaction[] ;
progress?: UserProgress[] ;
otps?: Otp[] ;
}
