import type { Application } from 'express'
import {
  attachControllers
} from '@decorators/express';
import { HomeController } from './HomeController'
import { PlayController } from './PlayController';


export const Router = (app: Application) => {
  attachControllers(app, [
    HomeController,
    PlayController
  ])
}
