import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import jwt from 'jsonwebtoken';
import { User } from './lib/user/User.entity';
import { NextFunction, Request, Response } from 'express';

type JwtPayload = {
  id: string;
};

export const jwtEncryptionSecret: string = (
  process.env.JWT_ENCRYPTION_SECRET || 'secret'
);
export const authentication = () => {
  const strategy = new Strategy({
    secretOrKey: jwtEncryptionSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }, (payload: JwtPayload, done: Function) => {
    return User.findOneOrFail({
      where: { id: payload.id },
    }).then(user => done(null, user)).catch(() => done())
  });
  passport.use(strategy);
  passport.initialize();

  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', {
      session: false,
    }, (error: Error, user) => {
      if (user) {
        req.user = user;
      }
      return next(error);
    })(req, res, next)
  }
};
