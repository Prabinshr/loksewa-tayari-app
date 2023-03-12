import { HttpException, Injectable } from '@nestjs/common';
import { CreateTransactionDto, UpdateTransactionDto } from 'src/@generated/transaction/dto/index';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}
  async create(
    createTransactionDto: CreateTransactionDto,
    quiz_id: string,
    user_id: string,
  ) {
    try {
      // Check if the transaction already exists.
      const transaction = await this.prisma.transaction.findFirst();
      if (transaction) return transaction;
      return await this.prisma.transaction.create({
        data: { ...createTransactionDto, quiz_id, user_id },
      });
    } catch (error) {
      throw new HttpException('Error creating transaction', 500);
    }
  }

  findAll() {
    try {
      return this.prisma.transaction.findMany();
    } catch (error) {
      throw new HttpException('Transaction Categories not found', 404);
    }
  }

  findOne(id: string) {
    try {
      return this.prisma.transaction.findFirst({
        where: {
          id: id,
        },
        include: {
          quiz: true,
        },
      });
    } catch (error) {
      throw new HttpException('Transaction not found', 404);
    }
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    try {
      return this.prisma.transaction.update({
        where: {
          id: id,
        },
        data: updateTransactionDto,
      });
    } catch (error) {
      throw new HttpException('Transaction not found', 404);
    }
  }

  remove(id: string) {
    try {
      return this.prisma.transaction.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Transaction not found', 404);
    }
  }
}
