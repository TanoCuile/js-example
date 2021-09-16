import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../services/users.service';
import { USER_SERVICE } from '../user.constants';

@Controller('users')
export class UsersController {
  constructor(@Inject(USER_SERVICE) protected userService: UserService) {}

  @Post('')
  async create(
    @Body() body: { userName: string; userPass: string; age: number },
  ) {
    const { userName, userPass, age } = body;
    if (!(userName && userPass)) {
      throw new Error('Invalid request');
    }
    await this.userService.addUser({ userName, userPass, age });
    return 'New user created';
  }

  @Get('')
  async getAll() {
    return {
      status: 'OK',
      users: await this.userService.getAllowedUsers(),
    };
  }

  @Patch(':id')
  async updateUser(@Body() body, @Param('id') userId: number) {
    await this.userService.updateUser(userId, body);
    return {
      status: 'OK',
    };
  }

  @Delete(':id')
  async delete(@Param('id') userId: number) {
    await this.userService.deleteUser(userId);
    return {
      status: 'User was deleted',
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getCurrent(@Param('id') userId: number) {
    return {
      status: 'OK',
      user: new UserDTO(await this.userService.getUser(userId)),
    };
  }
  // async getAllUserExpenses(req, res) {
  //   try {
  //     const userId = req.params.id;
  //     return res.json({
  //       status: 'OK',
  //       expenses: await this.userService.getAllUserExpenses(userId),
  //     });
  //   } catch (e) {
  //     return res.status(500).json(e);
  //   }
  // }

  // async getUserExpenses(req, res) {
  //   try {
  //     const userId = req.params.id;
  //     const expensesId = req.params.expensesId;
  //     return res.json({
  //       status: 'OK',
  //       expenses: getUserExpenses(userId, expensesId),
  //     });
  //   } catch (e) {
  //     return res.status(500).json(e);
  //   }
  // }

  // async deleteUserExpenses(req, res) {
  //   try {
  //     const expensesId = req.params.id;
  //     const userId = req.params.userId;
  //     deleteExpenses(userId, expensesId);
  //     return res.json({
  //       status: 'OK',
  //     });
  //   } catch (e) {
  //     return res.status(500).json(e);
  //   }
  // }

  // async updateUserExpenses(req, res) {
  //   try {
  //     const expensesId = req.params.id;
  //     const userId = req.params.userId;
  //     updateUserExpenses(userId, expensesId, req.body);
  //     return res.json({
  //       status: 'OK',
  //     });
  //   } catch (e) {
  //     return res.status(500).json(e);
  //   }
  // }
}
