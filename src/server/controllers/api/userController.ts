import * as Debug from 'debug';
import { BAD_REQUEST } from 'http-status-codes';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import User from '../../models/user';

const debug = Debug('app:controller:api:user');

const router = new Router();

router.get('/login', async (ctx, next) => {
  // console.log(req.user);
  ctx.body = ctx.params.user;
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
