import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCouponDto {
  @ApiProperty()
  @IsString()
  code: string;
  @ApiProperty()
  @IsNotEmpty()
  discountValue: number;
  @ApiProperty()
  @IsNotEmpty()
  maxUses: number;
  @ApiProperty()
  usedCount: number;
}
