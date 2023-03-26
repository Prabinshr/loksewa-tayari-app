
import {ApiProperty} from '@nestjs/swagger'


export class TransactionDto {
  id: string ;
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
}
