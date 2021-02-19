import {
  Controller, Get, Response
} from '@decorators/express';
import {
  Response as ExpressResponse
} from 'express';

@Controller('/')
export class HomeController {
  @Get('/')
  public async home(
    @Response() res: ExpressResponse
  ) {
    res.render('index', { title: 'Pyski' });
  }
}