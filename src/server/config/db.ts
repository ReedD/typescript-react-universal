import * as bluebird from 'bluebird';
import * as Debug from 'debug';
import * as mongoose from 'mongoose';

const debug = Debug('app:db');

(mongoose as any).Promise = bluebird;

mongoose.connect(process.env.MONGO || 'mongodb://localhost:27017/app', {
  promiseLibrary: bluebird,
  useMongoClient: true,
});

const db = mongoose.connection;

db.on('open', () => {
  debug('Connection opened');
});

db.on('error', e => {
  debug('Connection error: %O', e);
});

export default db;
