const {createConnection, EntitySchema} = require('typeorm');

/**
 * @type {import('typeorm').Connection}
 */
let connection;

module.exports = {
  getDBConnection: async function getDB() {
    try {
      if (!connection) {
          connection = await getNewConnection();
      }

      return connection;
    } catch (e) {
      console.log('---------->', e);
    }
  },
};

async function getNewConnection() {
    return await createConnection({
        password: 'ExPMan',
        username: 'expenses_manager',
        database: 'expenses',
        type: 'postgres',
        host: 'postgres',
        synchronize: true,
        entities: [
            new EntitySchema({
                name: 'users',
                columns: {
                    id: {
                        type: Number,
                        primary: true,
                        generated: true,
                        name: 'id',
                    },
                    firstName: {
                        name: 'first_name',
                        length: 64,
                        type: String,
                    },
                    lastName: {
                        name: 'last_name',
                        length: 16,
                        type: String,
                    },
                    passwd: {
                        name: 'password',
                        length: 255,
                        type: String,
                    },
                },
            }),
        ],
    });
}
