
import {ApiProperty} from '@nestjs/swagger'


export class UserDto {
  id: string ;
username: string ;
email: string ;
type: string ;
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
