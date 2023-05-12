import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamsetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
