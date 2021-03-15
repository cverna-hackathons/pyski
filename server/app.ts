import { resolve } from 'path';
import * as cors from 'cors';
import * as Logger from 'morgan';
import * as Express from 'express';
import { json, urlencoded } from 'body-parser';
import { initialize as initGraphQL } from './lib/graphql';

export const app = Express();

app.use(cors());
app.use(Logger('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(Express.static(resolve(__dirname, '../public')));

(async function main() {
  const graphql = await initGraphQL();

  app.post('/graphql', (_req, _res, next) => {
    if (
      _req.body &&
      _req.body.operationName !== 'IntrospectionQuery'
    ) {
      // console.log('gql:', _req.body);
    }
    return next()
  });
  graphql.applyMiddleware({ app });
  // catch 404 and forward to error handler
  app.set('gql', graphql);
  app.use(function(
    _req: Express.Request,
    _res: Express.Response,
    next: Function,
  ) {
    var error = new Error('Not Found');
    return next(error);
  });
})()


