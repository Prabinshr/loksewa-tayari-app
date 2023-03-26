
import {OTPType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class OtpDto {
  id: string ;
@ApiProperty({
  enum: OTPType,
})
type: OTPType ;
code: string ;
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
