import * as Debug from 'debug';
import * as session from 'koa-session';
import { redis } from './db';

const debug = Debug('app:session');

export default app => {
  app.keys = (process.env.SESSION_KEYS || '').split(',');
  return session(
    {
      key: 'app:session',
      store: {
        async destroy(key) {
          debug(`Destroy session key ${key}`);
          await redis.delAsync(key);
        },
        async get(key) {
          debug(`Get session key ${key}`);
          return JSON.parse(await redis.getAsync(key));
        },
        async set(key, sess, maxAge) {
          debug(`Set session key ${key} for ${maxAge / 1000} seconds`);
          return await redis.setexAsync(
            key,
            maxAge / 1000,
            JSON.stringify(sess)
          );
        },
      },
    },
    app
  );
};
