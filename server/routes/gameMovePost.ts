import { Request, Response } from 'express';

export const gameMovePost = async (_req: Request, res: Response) => {
  res.render('play/state', {
    message: 'OK',
  });
};
