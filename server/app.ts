var path = require('path')
const ExpressValidator = require('express-validator')

import * as Logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as Express from 'express'
import { Router } from './routes'

export const app = Express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(Logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(Express.static(path.resolve(__dirname, '../public')))
app.use(ExpressValidator())

Router(app)

// catch 404 and forward to error handler
app.use(function (_req: Express.Request, _res: Express.Response, next: Function) {
  var err = new Error('Not Found')
  return next(err)
})
