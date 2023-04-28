// export class CreateSyllabusSubStructureDto {
//   syllabus_structure_id: number;
//   title: string;
//   description?: string;
//   image?: string;
// }

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSyllabusSubStructureDto {
  @ApiProperty()
  @IsNotEmpty()
  syllabus_structure_id: number;
  

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  image?: string;
}
