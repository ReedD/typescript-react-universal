import { RequestHandler } from 'express';
import { UserModel } from '../../models/user';

export const login: RequestHandler = (req, res) => {
  console.log(req.user);
  res.send(req.user);
};

export const create: RequestHandler = (req, res) => {
  const user = new UserModel(req.body);
  user.save().then(u => res.json(u)).catch(e => res.json(e));
};
