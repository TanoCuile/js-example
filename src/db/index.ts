const fs = require('fs');
const md5 = require('md5');
// Usefull `resolve` -> 'dir/dir/../../blah' => `./blah`
const {join} = require('path');

import {User} from './entities/User';
import {getDBConnection as getDB} from './typeorm';

// process - is object for interacting with system.
// It also contains all current process related data
// `child_process` lib -> parent process
// `cwd` -> full path to called file
const DB_BASEPATH = join(process.cwd(), 'db');

async function getUserRepository() {
  const db = await getDB();
  const usersRepository = db.getRepository(User);
  return usersRepository;
}

async function getDBUsers(): Promise<User[]> {
  const usersRepository = await getUserRepository();

  return usersRepository.find({});
}

export {getDB};

export const getAllowedUsers = async () => {
  return getDBUsers();
};

export const addUser = async (user: {userPass: string; userName: string}) => {
  const usersRepository = await getUserRepository();
  const password = md5(user.userPass);
  usersRepository.save({
    firstName: user.userName,
    lastName: '-',
    passwd: password,
  });
};
