import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Role } from '@prisma/client';
import { CreateTransactionDto } from './dto';

@ApiTags('Transaction')
@ApiBearerAuth('jwt')
@UseGuards(RolesGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // TODO: CUD transactions should be done by the system. So, not exposing them to the user.
  // @Post()
  // create(
  //   @Body() createTransactionDto: CreateTransactionDto,
  //   quiz_id: string,
  //   user_id: string,
  // ) {
  //   return this.transactionService.create(
  //     createTransactionDto,
  //     quiz_id,
  //     user_id,
  //   );
  // }

  @Get()
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get transactions.' })
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  // @Roles(Role.ADMIN)
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Get transaction by id.' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionService.update(id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionService.remove(id);
  // }
}
