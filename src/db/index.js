const fs = require('fs');
const md5 = require('md5');
// Usefull `resolve` -> 'dir/dir/../../blah' => `./blah`
const {join} = require('path');

const {getDBConnection: getDB} = require('./typeorm');

// process - is object for interacting with system.
// It also contains all current process related data
// `child_process` lib -> parent process
// `cwd` -> full path to called file
const DB_BASEPATH = join(process.cwd(), 'db');

function getDBUsers() {
  if (!fs.existsSync(join(DB_BASEPATH, 'users.json'))) {
    fs.writeFileSync(join(DB_BASEPATH, 'users.json'), JSON.stringify([]));
  }

  // Replace in future
  const users = fs.readFileSync(join(DB_BASEPATH, 'users.json'));
  return JSON.parse(users.toString());
}

module.exports = {
  getDB,
  getAllowedUsers: async () => {
    return getDBUsers();
  },
  addUser: async (user) => {
    const db = await getDB();
    const password = md5(user.userPass);
    console.log('', user, password);
    const usersRepository = db.getRepository('users');
    usersRepository.save({
      firstName: user.userName,
      lastName: '-',
      passwd: password
    });

    const users = getDBUsers();
    users.push({id: users.length + 1, ...user});
    fs.writeFileSync(join(DB_BASEPATH, 'users.json'), JSON.stringify(users));
  },
};
