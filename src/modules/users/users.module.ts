import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { USER_SERVICE } from './user.constants';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [USER_SERVICE],
})
export class UsersModule {}
