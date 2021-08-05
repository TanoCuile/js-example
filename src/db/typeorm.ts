import {Connection, createConnection} from 'typeorm';

let connection: Connection;

export const getDBConnection = async function getDB(): Promise<Connection> {
  if (!connection) {
    connection = await getNewConnection();
  }

  return connection;
};

const getNewConnection = async () => {
  return await createConnection();
};
