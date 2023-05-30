import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateForumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sewaServiceId: string;
}
