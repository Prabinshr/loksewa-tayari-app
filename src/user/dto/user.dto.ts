
import {Role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'


export class UserDto {
  id: string ;
username: string ;
first_name: string ;
middle_name: string  | null;
last_name: string ;
email: string ;
@ApiProperty({
  enum: Role,
})
type: Role  | null;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
createdAt: Date ;
@ApiProperty({
  type: `string`,
  format: `date-time`,
})
updatedAt: Date ;
}
