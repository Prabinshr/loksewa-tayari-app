import { OTPType } from '@prisma/client';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
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
  code: string;
}
