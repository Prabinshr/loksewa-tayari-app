import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOTP } from 'src/helpers/utils';
import { OTPType } from '@prisma/client';

@Injectable()
export class OtpService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOtp(user_id: string, type: OTPType) {
    if (!type || !user_id) {
      throw new BadRequestException('Type and user_id are required');
    }

    if (!OTPType[type]) {
      throw new BadRequestException('Invalid OTP type');
    }
    return await this.prismaService.oTP.create({
      data: {
        user_id,
        code: await generateOTP(6),
        type,
      },
    });
  }

  async deleteOtp(user_id: string, code: string, type: OTPType) {
    const otp = await this.prismaService.oTP.findFirst({
      where: { user_id, code, type },
    });
    if (!otp) {
      throw new NotFoundException('OTP not found');
    }
    return this.prismaService.oTP.delete({
      where: {
        ...otp,
      },
    });
  }

  async validateOtp(user_id: string, code: string, type: OTPType) {
    // OTP is valid for 15 minutes only
    // 1. Define the expiry time for the OTP
    const expiryTime = 1000 * 60 * 15;

    // 2. Retrieve the OTP from the database
    const otp = await this.prismaService.oTP.findFirst({
      where: { user_id, code, type },
    });

    // 3. Check if the OTP exists
    if (!otp) throw new NotFoundException('Invalid OTP');

    // 4. If the OTP exists, check if it has expired
    if (otp.createdAt.getTime() + expiryTime < Date.now()) {
      throw new BadRequestException('OTP has expired!');
    }

    // 5. Return true if the OTP exists and has not expired
    return true;
  }

  async findLastOtp(user_id: string, type: OTPType) {
    return await this.prismaService.oTP.findFirst({
      where: {
        user_id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
