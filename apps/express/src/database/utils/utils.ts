import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

const opts: ConnectOptions = {
  dbName: 'todos-notes',
};

export const getMongoUri = () => mongoServer.getUri();

export const connect = async () => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  try {
    await mongoose.connect(getMongoUri(), opts);
  } catch (error) {
    console.error(error);
  }
};

// Remove and close the database and server.
export const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

// Remove all data from collections
export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
