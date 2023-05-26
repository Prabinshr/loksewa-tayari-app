import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  forumId: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  creator_name?: string;

  @ApiProperty()
  @IsOptional()
  creator_profile?: string;
}
