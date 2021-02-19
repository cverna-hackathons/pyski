import { playPost } from './playPost'
import type { Request, Application, Response } from 'express'

export const Router = (app: Application) => {
  const GRID_SIZES = [10, 30, 50, 100]

  app.get('/', (_req: Request, res: Response) => {
    res.render('index', { title: 'Pyski server' })
  })

  app.get('/setup', (_req: Request, res: Response) => {
    res.render('play/setup', { GRID_SIZES })
  })

  app.post('/play', playPost)
}
