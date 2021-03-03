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
import { matchPost } from './matchPost';

const GRID_SIZES = [3, 10, 30, 50, 100]

@Controller('/match')
export class MatchController {
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
    return matchPost(req, res);
  }
}