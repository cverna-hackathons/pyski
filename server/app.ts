import { resolve } from 'path';
import * as cors from 'cors';
import * as Logger from 'morgan';
import * as Express from 'express';
import { Router } from './routes';
import { json, urlencoded } from 'body-parser';

export const app = Express();

app.use(cors());
app.use(Logger('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(Express.static(resolve(__dirname, '../public')));

Router(app);

// catch 404 and forward to error handler
app.use(function(
  _req: Express.Request,
  _res: Express.Response,
  next: Function,
) {
  var error = new Error('Not Found');
  return next(error);
});
