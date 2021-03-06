/**
 * Module dependencies.
 */
import { app } from './app';

import debug from 'debug';

/**
 * Get port from environment and store in Express.
 */

debug('pyski:www');
const port = process.env.PORT || 4141;
app.set('port', port);

app.listen(port, () => {
  debug(`listening::${port}`);
});
