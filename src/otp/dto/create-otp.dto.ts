import { OTPType } from '@prisma/client';
import { IsIn, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
  @ApiProperty({
    enum: OTPType,
  })
  @IsNotEmpty()
  @IsIn(['EMAIL_VERIFICATION', 'PASSWORD_RESET', 'OTHER'])
  type: OTPType;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6,{message: "The OTP code must be 6 digits."})
  @MaxLength(6,{message: "The OTP code must be 6 digits."})
  code: string;
}
