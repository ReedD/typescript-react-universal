import * as Debug from 'debug';
import AppError from 'error';
import { BAD_REQUEST } from 'http-status-codes';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import User from '../../models/user';

const debug = Debug('app:controller:api:user');

const router = new Router();

router.post('/api/users/login', async (ctx, next) => {
  debug(`POST to ${ctx.path}: %O`, ctx.request.body);
  try {
    const { email, password } = ctx.request.body.data;
    const user = await User.findOne({ email }).exec();
    if (user && (await user.authenticate(password))) {
      ctx.body = user;
    } else {
      const error = new AppError('Invalid email/password combination', {
        email: !user && { message: 'E-mail not registered' },
        password: user && { message: 'Invalid password' },
      });
      ctx.status = BAD_REQUEST;
      ctx.body = error;
    }
  } catch (e) {
    debug(e.message);
    ctx.status = BAD_REQUEST;
    ctx.body = e;
  }
  debug('POST complete: %d', ctx.status);
  next();
});

router.post('/api/users', async (ctx, next) => {
  debug(`POST to ${ctx.path}: %O`, ctx.request.body);
  const user = new User(ctx.request.body.data);
  try {
    await user.save();
    ctx.body = user;
  } catch (e) {
    debug(e.message);
    ctx.status = BAD_REQUEST;
    ctx.body = e;
  }
  debug('POST complete: %d', ctx.status);
  next();
});

export default compose([router.routes(), router.allowedMethods()]);
