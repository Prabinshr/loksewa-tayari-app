import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator";

export class CreateSubserviceHasSyllabusDto {
  @ApiProperty()
  @IsNotEmpty()
  service_id: string;
  @ApiProperty()
  @IsNotEmpty()
  syllabus_sub_structure_id: string;
}
