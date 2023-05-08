import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  category_id: string;
  
  @ApiProperty({
    type: `number`,
    format: `float`,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;
  @ApiProperty({
    type: `number`,
    format: `float`,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  negative_mark_value?: number;
}
