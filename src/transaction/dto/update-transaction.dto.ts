
import {Type} from 'class-transformer'
import {IsInt,IsOptional,IsRFC3339} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateTransactionDto {
  @ApiProperty({
  type: `integer`,
  format: `int32`,
})
@IsOptional()
@IsInt()
amount?: number;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
@IsOptional()
@IsRFC3339()
transaction_date?: Date;
}
