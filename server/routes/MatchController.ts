import { Controller, Post, Request, Response } from '@decorators/express';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { matchPost } from './matchPost';

@Controller('/match')
export class MatchController {
  @Post('/')
  public async play(
    @Request() req: ExpressRequest,
    @Response() res: ExpressResponse,
  ) {
    return matchPost(req, res);
  }
}
