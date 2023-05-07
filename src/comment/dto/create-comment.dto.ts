import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  userId: string;
}
