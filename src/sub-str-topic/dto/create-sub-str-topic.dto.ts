import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSubStrTopicDto {
  @ApiProperty()
  @IsNotEmpty()
  sub_struct_topic_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;
}
