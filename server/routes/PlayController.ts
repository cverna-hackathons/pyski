import {
  Controller,
  Get,
  Post,
  Request,
  Response,
} from '@decorators/express';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { playPost } from './playPost';

const GRID_SIZES = [10, 30, 50, 100]

@Controller('/play')
export class PlayController {
  @Get('/setup')
  public async setup(
    @Response() res: ExpressResponse
  ) {
    res.render('play/setup', { GRID_SIZES })
  }
  @Post('/')
  public async play(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse
  ) {
    return playPost(req, res);
  }
}