// import {User} from './db/entities/User';

import express from 'express';
import {join} from 'path';
import {getAllowedUsers, addUser} from './db';
// const {getDB} = require('./db');

const server = express();

server.use(express.json());

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const homepageController = (req, res) => {
  res.json({
    status: 'OK',
  });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const actionController = (req, res) => {
  res.json({
    status: 'OK',
    method: req.method,
    body: req.body,
  });
};

async function getCurrentUser(req) {
  const users: any[] = await getAllowedUsers();
  const currentUser = users.filter(
    ({userName, userPass}: {userName: string; userPass: string}) =>
      `${userName}:${userPass}` === req.headers.authorization
  );
  return currentUser[0];
}

const authorizeAdminMiddleware = async (req, res, next) => {
  const currentUser = await getCurrentUser(req);
  if (
    currentUser &&
    currentUser.roles &&
    currentUser.roles.includes('SITE_ADMIN')
  ) {
    return next();
  }
  res.status(403);
  return res.json({status: 'error'});
};

const authorizeMiddleware = async (req, res, next) => {
  const currentUser = await getCurrentUser(req);
  if (currentUser) {
    return next();
  }
  res.status(403);
  return res.json({status: 'error'});
};

server.get('', homepageController);

/**
 * /expenses (get,put,post,delete) Table expenses contain user ID, get expenses, should use current(be headers) user ID
 * (Admin[roles=[SITE_ADMIN]]) - should see skip userID check
 */

const actionsRoute = express.Router();
actionsRoute.use('', authorizeMiddleware);
actionsRoute.post('', actionController);
actionsRoute.put('', actionController);
actionsRoute.patch('', actionController);
server.use('/actions', actionsRoute);

server.post('/users', authorizeAdminMiddleware, (req, res) => {
  const {userName, userPass} = req.body;
  if (!(userName && userPass)) {
    return res.json({
      status: 'error',
    });
  }
  addUser({userName, userPass});
  return res.json({
    status: 'OK',
  });
});
server.get('/users', authorizeAdminMiddleware, async (req, res) => {
  return res.json({
    status: 'OK',
    users: await getAllowedUsers(),
  });
});
// console.log(join(process.cwd(), 'public'));
server.use('/public', express.static(join(process.cwd(), 'public'), {extensions: ['bin']}));

// getDB()
//   .then(() => {
server.listen('3000', () => {
  console.log('OK');
});
// });
