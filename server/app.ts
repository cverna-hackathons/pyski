import { resolve } from 'path';
import * as cors from 'cors';
import * as Logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as Express from 'express';
import { Router } from './routes';

export const app = Express();

app.use(cors());
app.use(Logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Express.static(resolve(__dirname, '../public')));

Router(app);

// catch 404 and forward to error handler
app.use(function (
  _req: Express.Request,
  _res: Express.Response,
  next: Function,
) {
  var error = new Error('Not Found');
  return next(error);
});
