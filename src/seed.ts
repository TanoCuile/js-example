import { NestFactory } from '@nestjs/core';
import { Connection, Repository } from 'typeorm';
import {
  DATABASE_CONNECTION,
  EXPENSE_REPOSITORY,
  NOTE_REPOSITORY,
  TAG_REPOSITORY,
  USER_REPOSITORY,
} from './modules/database/database.constants';
import { ConsoleModule } from './console.module';
import * as faker from 'faker';
import { Expense } from './modules/database/entities/Expense';
import { User } from './modules/database/entities/User';
import { Tag } from './modules/database/entities/Tag';
import { Note } from './modules/database/entities/Note';

async function bootstrap() {
  const app = await NestFactory.create(ConsoleModule);
  await seedDB(app);
}
bootstrap();

async function seedDB(app) {
  const userRepo: Repository<User> = app.get(USER_REPOSITORY);
  const expenseRepo: Repository<Expense> = app.get(EXPENSE_REPOSITORY);
  const noteRepo: Repository<Note> = app.get(NOTE_REPOSITORY);
  const tagRepo: Repository<Tag> = app.get(TAG_REPOSITORY);

  const tags = [];

  for (let t = 0; t < 50; ++t) {
    const tag = new Tag();
    tag.name = faker.lorem.word();
    tags.push(await tagRepo.save(tag));
  }

  const users = [];
  const expenses = [];

  for (let u = 0; u < 2; ++u) {
    const user = new User();
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.age = faker.datatype.number(60);
    user.passwd = faker.name.middleName();
    user.role = 'user';

    const savedUser = await userRepo.save(user);

    for (let e = 0; e < 1000; ++e) {
      const expense = new Expense();
      expense.user = savedUser;
      expense.amount = faker.datatype.number(500);
      expense.time = faker.date.past().getDate();
      expense.purpose = faker.lorem.word();
      expense.tags = faker.random.arrayElements(tags, 5);
      expense.user = savedUser;

      expenses.push(await expenseRepo.save(expense));
    }
    users.push(savedUser);
  }

  for (let n = 0; n < 100; ++n) {
    const note = new Note();
    note.user = faker.random.arrayElement(users);
    note.expense = faker.random.arrayElement(expenses);
    note.text = faker.lorem.sentences(3);
    await noteRepo.save(note);
  }
}
