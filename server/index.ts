/**
 * Module dependencies.
 */
import { app } from './app';

import debug from 'debug';
import { connect } from './lib/database';

(async function() {
  debug('pyski:www');
  const port = process.env.PORT || 4141;

  await connect();
  app.set('port', port);
  app.listen(port, () => {
    debug(`listening::${port}`);
  });
})()
