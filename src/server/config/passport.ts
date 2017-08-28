import { Express } from 'express';
import * as passport from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions as JWTStrategyOptions,
} from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

passport.use(
  new JwtStrategy(options, (jwtPayload: any, done: any) => {
    console.log(jwtPayload);
    done(null, {
      name: 'Reed',
    });
  }),
);
