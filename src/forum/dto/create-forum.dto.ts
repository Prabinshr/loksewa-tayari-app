import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateForumDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  
  @ApiProperty()
  @IsOptional()
  image?: string;
}
