import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuizCategoryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
