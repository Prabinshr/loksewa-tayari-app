import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGorkhaPatraDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  news_link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_url: string;
}
