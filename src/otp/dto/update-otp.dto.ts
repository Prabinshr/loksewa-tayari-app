
import {OTPType} from '@prisma/client'
import {IsIn,IsOptional,IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateOtpDto {
  @ApiProperty({
  enum: OTPType,
})
@IsOptional()
@IsIn(["EMAIL_VERIFICATION","PASSWORD_RESET","OTHER"])
type?: OTPType;
@ApiProperty()
@IsOptional()
@IsString()
code?: string;
}
