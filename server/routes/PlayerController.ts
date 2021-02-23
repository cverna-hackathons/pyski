import {
  Controller,
  Get,
  Request,
  Response,
} from '@decorators/express';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { getLocalPlayers } from '../lib/players'

@Controller('/players')
export class PlayerController {
  @Get('/')
  public async players(
    @Request() _: ExpressRequest,
    @Response() res: ExpressResponse
  ) {
    return res.send(getLocalPlayers())
  }
}
