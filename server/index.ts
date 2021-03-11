/**
 * Module dependencies.
 */
import { app } from './app';
import * as Debugger from 'debug';
import { connect } from './lib/database';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';

const debug = Debugger('pyski:www');

(async function() {
  const port = process.env.PORT || 4141;
  const server = createServer(app);

  await connect();
  app.set('port', port);

  server.listen(port, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema: app.get('gql').schema,
    }, {
      server,
      path: '/subscriptions',
    })
    debug(`listening::${port}|ws server for /subscriptions`);
  });
})()
