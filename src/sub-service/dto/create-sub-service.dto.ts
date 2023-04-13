import { STATUS } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubServiceDto {
  @IsNotEmpty()
  sewaService_id: number;
  @IsNotEmpty()
  @IsString()
  title: string;

  description?: string;
  image?: string;
  
  @IsNotEmpty()
  status: STATUS;
}
