import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CheckEmail {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
