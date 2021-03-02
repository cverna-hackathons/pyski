import type { Application } from 'express';
import { attachControllers } from '@decorators/express';
import { HomeController } from './HomeController';
import { GameController } from './GameController';
import { MatchController } from './MatchController';
import { PlayerController } from './PlayerController';

export const Router = (app: Application) => {
  attachControllers(app, [
    HomeController,
    GameController,
    MatchController,
    PlayerController,
  ]);
};
