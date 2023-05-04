import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  forumId: string;
}
