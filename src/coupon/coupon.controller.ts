import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/guards/roles.decorator';


@ApiTags('Coupon')
@Controller('coupon')
@ApiBearerAuth('jwt')
@Controller('user')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // @Post()
  // create(@Body() createCouponDto: CreateCouponDto) {
  //   return this.couponService.create(createCouponDto);
  // }

  @Post()
  async createCoupon(
    @Body('discountValue') discountValue: number,
    @Body('maxUses') maxUses: number,
    @Body('usedCount') usedCount: number,
  ): Promise<{ code: string }> {
    const code = await this.couponService.createCoupon(discountValue,maxUses,usedCount);
    return { code };
  }

  @Post('/apply')
  async applyCoupon(
    @Body('transactionId') transactionId: string,
    @Body('couponCode') couponCode: string,
  ): Promise<void> {
    await this.couponService.applyCoupon(transactionId, couponCode);
  }
  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.couponService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
  //   return this.couponService.update(+id, updateCouponDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.couponService.remove(+id);
  // }
}
