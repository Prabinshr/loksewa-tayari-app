
import {Role} from '@prisma/client'
import {IsIn,IsOptional,IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateUserDto {
  @ApiProperty()
@IsOptional()
@IsString()
username?: string;
@ApiProperty()
@IsOptional()
@IsString()
first_name?: string;
@ApiProperty()
@IsOptional()
@IsString()
middle_name?: string;
@ApiProperty()
@IsOptional()
@IsString()
last_name?: string;
@ApiProperty()
@IsOptional()
@IsString()
password?: string;
@ApiProperty()
@IsOptional()
@IsString()
email?: string;
@ApiProperty({
  enum: Role,
  default: `USER`,
})
@IsOptional()
@IsIn(["ADMIN","MODERATOR","SUBSCRIBED_USER","USER"])
type?: Role;
}
