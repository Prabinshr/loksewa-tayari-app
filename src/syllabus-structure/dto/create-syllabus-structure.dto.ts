import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSyllabusStructureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsOptional()
  description?: string;
  @ApiProperty()
  @IsUrl()
  @IsString()
  @IsOptional()
  image?: string;
}
