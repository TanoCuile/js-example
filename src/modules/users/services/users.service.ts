import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../database/database.constants';
import { User } from '../../database/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) protected userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({});
  }

  async getAllowedUsers() {
    return this.getAllUsers();
  }
  async addUser(user: { userPass: string; userName: string; age: number }) {
    const hashedPassword = bcrypt.hashSync(user.userPass, 6);

    this.userRepository.save({
      firstName: user.userName,
      lastName: '-',
      passwd: hashedPassword,
      age: user.age,
    });
  }

  async updateUser(userId: number, user: any) {
    return this.userRepository.update(
      { id: userId },
      {
        firstName: user.userName || undefined,
        lastName: '-',
        age: user.age || undefined,
      },
    );
  }

  async getUser(userId: number) {
    const user = await this.userRepository.findOne({ id: userId });

    return user;
  }
  async deleteUser(userId: number) {
    const res = await this.userRepository.delete({ id: userId });
    return res;
  }
}
