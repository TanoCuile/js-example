import { Provider } from '@nestjs/common';
import { Connection, createConnection, Repository } from 'typeorm';
import { Expense } from '../entities/Expense';
import { User } from '../entities/User';
import {
  DATABASE_CONNECTION,
  USER_REPOSITORY,
  EXPENSE_REPOSITORY,
} from '../database.constants';

const MAX_RETRIES = 10;
let tries = 0;

const tryToConnect = async (): Promise<Connection> => {
  return new Promise(async (resolve, reject) => {
    try {
      return resolve(createConnection());
    } catch (e) {
      if (tries < MAX_RETRIES) {
        ++tries;
        return setTimeout(
          () => tryToConnect().then(resolve).catch(reject),
          1000,
        );
      }
      return reject(e);
    }
  });
};

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: () => tryToConnect(),
  },
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection): Repository<User> =>
      connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
  {
    provide: EXPENSE_REPOSITORY,
    useFactory: (connection: Connection): Repository<Expense> =>
      connection.getRepository(Expense),
    inject: [DATABASE_CONNECTION],
  },
] as Provider[];
