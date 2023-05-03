import { HttpException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prismaService: PrismaService) {}

  async createCoupon(discountValue: number, maxUses: number, usedCount : number) : Promise<string> {
    const code = this.generateCouponCode(8);
    const coupon = await this.prismaService.coupon.create({
      data: {
        code,
        discountValue,
        maxUses,
        usedCount
      
      },
    });
    return coupon.code;
  }

  //generate coupon code
  private generateCouponCode(length: number): string {
    let code = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters.charAt(randomIndex);
      code += randomCharacter;
    }
    return code;
  }

  //apply coupon discount in the transaction
  async applyCoupon(transactionId: string, couponCode: string): Promise<void> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    const coupon = await this.prismaService.coupon.findUnique({
      where: {
        code: couponCode,
      },
    });
    // if (!coupon || coupon.expiration < new Date() || coupon.usedCount >= coupon.maxUses) {
    if (!coupon || coupon.usedCount >= coupon.maxUses) {
      throw new Error('Invalid coupon');
    }
    const discountedAmount = transaction.amount - coupon.discountValue;
    await this.prismaService.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        couponCode,
        amount: discountedAmount,
      },
    });

    //updates usedCount after you used the coupon
    await this.prismaService.coupon.update({
      where: {
        id: coupon.id,
      },
      data: {
        usedCount: coupon.usedCount + 1,
      },
    });
  }

  findAll() {
    try {
      return this.prismaService.coupon.findMany();
    } catch (error) {
      throw new HttpException('Cannot find coupon.', 404);
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} coupon`;
  // }

  // update(id: number, updateCouponDto: UpdateCouponDto) {
  //   return `This action updates a #${id} coupon`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} coupon`;
  // }
}

