import { playPost } from './playPost'
import * as Express from 'express'

export const Router = (app: Express.Application) => {
  const GRID_SIZES = [10, 30, 50, 100]

  app.get('/', (_req: Express.Request, res: Express.Response) => {
    res.render('index', { title: 'Pyski server' })
  })

  app.get('/setup', (_req: Express.Request, res: Express.Response) => {
    res.render('play/setup', { GRID_SIZES })
  })

  app.post('/play', playPost)
}
