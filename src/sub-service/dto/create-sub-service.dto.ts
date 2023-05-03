import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

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
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  status: STATUS;
}
