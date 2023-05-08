import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSubServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  sewaService_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  @IsUrl()
  @IsString()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  status: STATUS;
}
