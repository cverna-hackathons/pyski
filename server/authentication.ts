import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import jwt from 'jsonwebtoken';
import { User } from './lib/user/User.entity';
import { NextFunction, Request, Response } from 'express';

type JwtPayload = {
  id: string;
};

export const authentication = () => {
  const jwtEncryptionSecret: string = (
    process.env.JWT_ENCRYPTION_SECRET || 'secret'
  );
  const strategy = new Strategy({
    secretOrKey: jwtEncryptionSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }, (payload: JwtPayload, done: Function) => {
    console.log('JwtPayload', payload);
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
      console.log('info', { error, user });
      if (user) {
        req.user = user;
      }
      return next(error);
    })(req, res, next)
  }
};
