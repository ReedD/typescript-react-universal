import * as bluebird from 'bluebird';
import * as Debug from 'debug';
import * as mongoose from 'mongoose';
import * as Redis from 'redis';

const debug = Debug('app:db');

bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

(mongoose as any).Promise = bluebird;

mongoose.connect(process.env.MONGO || 'mongodb://localhost:27017/app', {
  promiseLibrary: bluebird,
  useMongoClient: true,
});

export const mongo = mongoose.connection;

mongo.on('open', () => {
  debug('Connection opened');
});

mongo.on('error', e => {
  debug('Connection error: %O', e);
});

export const redis = Redis.createClient(
  process.env.REDIS_PORT || 6379,
  process.env.REDIS_HOST || 'localhost'
);
