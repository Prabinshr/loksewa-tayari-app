import { ApiProperty } from "@nestjs/swagger";
import { QSN_TYPE } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionSetDto {
  @ApiProperty()
  @IsNotEmpty()
  type: QSN_TYPE;

  @ApiProperty()
  @IsNotEmpty()
  topic_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @ApiProperty()
  description?: string;
}
