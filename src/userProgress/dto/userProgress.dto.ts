import { ApiProperty } from '@nestjs/swagger';

export class UserProgressDto {
  id: string;

  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  score: number;

  @ApiProperty({
    type: `number`,
    format: `float`,
  })
  negative_score: number;

  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  createdAt: Date;

  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  updatedAt: Date;
}
