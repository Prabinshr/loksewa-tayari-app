import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CheckUsername {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  username: string;
}
