
import {OTPType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'
import {User} from '../../user/entities/user.entity'


export class Otp {
  id: string ;
@ApiProperty({
  enum: OTPType,
})
type: OTPType ;
code: string ;
user_id: string ;
user?: User ;
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
