import { ApiProperty } from "@nestjs/swagger"

export class CreateSubserviceHasSyllabusDto {
  @ApiProperty()
  service_id: number;
  @ApiProperty()
  syllabus_sub_structure_id: number;
}
