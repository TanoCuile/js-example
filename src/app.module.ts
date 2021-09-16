import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ExpensesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}