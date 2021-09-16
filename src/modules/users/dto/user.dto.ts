import { Exclude } from 'class-transformer';
import { User } from '../../database/entities/User';

export class UserDTO {
  @Exclude()
  passwd!: string;
  constructor(dbUser: User) {
    Object.assign(this, dbUser);
  }
}
