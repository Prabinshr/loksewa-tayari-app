import { HttpException, Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PackageService {
  constructor(private prismaService: PrismaService) {}
  create(createPackageDto: CreatePackageDto) {
    try {
      return this.prismaService.package.create({ data: createPackageDto });
    } catch (error) {
      throw new HttpException('Cannot create package.', 404);
    }
  }

  //apply package amount in the transaction
  async applyPackage(
    transactionId: string,
    package_title: string,
  ): Promise<void> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    const uniquePackage = await this.prismaService.package.findUnique({
      where: {
        title: package_title,
      },
    });

    const packageAmount = uniquePackage.amount;
    await this.prismaService.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        package_title,
        amount : packageAmount,
      },
    });
  }

  
  findAll() {
    try {
      return this.prismaService.package.findMany();
    } catch (error) {
      throw new HttpException('Cannot find all packages.', 404);
    }
  }

  // findOne(id: string) {
  //   try {
  //     return this.prismaService.package.findUnique({ where: { id: id } });
  //   } catch (error) {
  //     throw new HttpException('Cannot find package by id.', 404);
  //   }
  // }

  // update(id: number, updatePackageDto: UpdatePackageDto) {
  //   return `This action updates a #${id} package`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} package`;
  // }
}
