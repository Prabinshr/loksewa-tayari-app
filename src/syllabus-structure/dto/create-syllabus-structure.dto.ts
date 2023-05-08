import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSyllabusStructureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  @IsUrl()
  @IsString()
  image?: string;
}
