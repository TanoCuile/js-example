import { Module } from '@nestjs/common';
import { ExpensesController } from './controllers/expenses.controller';

@Module({
  controllers: [ExpensesController],
})
export class ExpensesModule {}
