import * as Router from 'koa-router';
import { UserModel } from '../../models/user';

const router = new Router();

router.get('/login', async (ctx, next) => {
  // console.log(req.user);
  ctx.body = ctx.params.user;
});

router.post('/api/users', async (ctx, next) => {
  const user = new UserModel(ctx.request.body);
  console.log(ctx.request.body);
  // user.save().then(u => res.json(u)).catch(e => res.json(e));
  ctx.body = user;
});

export default router;
