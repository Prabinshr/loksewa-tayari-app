import { OnlineStatus, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  middle_name: string | null;
  @ApiProperty({
    enum: OnlineStatus,
    default: OnlineStatus.OFFLINE,
  })
  onlineStatus: OnlineStatus;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  email: string;
  @ApiProperty({
    enum: Role,
  })
  type: Role | null;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  createdAt: Date;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  updatedAt: Date;
}
