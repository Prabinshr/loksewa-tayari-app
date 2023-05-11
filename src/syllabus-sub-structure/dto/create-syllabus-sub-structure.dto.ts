// export class CreateSyllabusSubStructureDto {
//   syllabus_structure_id: number;
//   title: string;
//   description?: string;
//   image?: string;
// }

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSyllabusSubStructureDto {
  @ApiProperty()
  @IsNotEmpty()
  syllabus_structure_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsUrl()
  @IsString()
  @IsOptional()
  image?: string;
}
