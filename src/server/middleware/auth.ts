import { RequestHandler } from 'express';

export default ((req, res, next) => {
  next();
}) as RequestHandler;
