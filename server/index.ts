/**
 * Module dependencies.
 */
import { app } from './app';

import * as Debugger from 'debug';
import { connect } from './lib/database';

const debug = Debugger('pyski:www');

(async function() {
  const port = process.env.PORT || 4141;

  await connect();
  app.set('port', port);
  app.listen(port);

  debug(`listening::${port}`);
})()
