import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSubStrTopicDto {
  @ApiProperty()
  @IsNotEmpty()
  sub_struct_topic_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  image?: string;
}
