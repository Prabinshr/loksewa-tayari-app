import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  @IsOptional()
  creator_name?: string;

  @ApiProperty()
  @IsOptional()
  creator_profile?: string;
}
