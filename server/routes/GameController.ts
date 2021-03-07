import {
  Controller,
  // Get,
  Post,
  Request,
  Response,
} from '@decorators/express';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { gameMovePost } from './gameMovePost';

@Controller('/game')
export class GameController {
  @Post('/move')
  public async move(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    return gameMovePost(req, res);
  }
}
