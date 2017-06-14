import { Express } from 'express';
import * as passport from 'passport';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions as JWTStrategyOptions,
} from 'passport-jwt';

const options: JWTStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'secret',
};

passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    console.log(jwtPayload);
    done(null, {
      name: 'Reed',
    });
  }),
);
