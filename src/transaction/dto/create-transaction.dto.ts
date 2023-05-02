import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsRFC3339 } from 'class-validator';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  @IsNotEmpty()
  @IsInt()
  amount: number;

  couponCode?: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  @IsNotEmpty()
  @IsRFC3339()
  transaction_date: Date;
}
