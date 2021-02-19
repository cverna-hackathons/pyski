import { playPost } from './playPost'
import type { Request, Application, Response } from 'express'
import {
  attachControllers
} from '@decorators/express';
import { HomeController } from './HomeController'


export const Router = (app: Application) => {
  const GRID_SIZES = [10, 30, 50, 100]

  attachControllers(app, [ HomeController ])

  app.get('/setup', (_req: Request, res: Response) => {
    res.render('play/setup', { GRID_SIZES })
  })

  app.post('/play', playPost)

}
