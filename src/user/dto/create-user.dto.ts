
import {Role} from '@prisma/client'
import {IsBoolean, IsIn,IsNotEmpty,IsOptional,IsString} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'




export class CreateUserDto {
  @ApiProperty()
@IsNotEmpty()
@IsString()
username: string;
@ApiProperty()
@IsNotEmpty()
@IsString()
first_name: string;
@ApiProperty()
@IsOptional()
@IsString()
middle_name?: string;
@ApiProperty()
@IsNotEmpty()
@IsString()
last_name: string;
@ApiProperty()
@IsNotEmpty()
@IsString()
password: string;
@ApiProperty()
@IsNotEmpty()
@IsString()
email: string;
@ApiProperty()
@IsBoolean()
verified: boolean;
@ApiProperty({
  enum: Role,
  default: `USER`,
})
@IsOptional()
@IsIn(["ADMIN","MODERATOR","SUBSCRIBED_USER","USER"])
type?: Role;
}
