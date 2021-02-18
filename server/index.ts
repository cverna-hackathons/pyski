/**
 * Module dependencies.
 */
import { app } from './app'

var debug = require('debug')('pyski:www');

/**
 * Get port from environment and store in Express.
 */

var port = (process.env.PORT || 4141);
app.set('port', port);

export const server = app.listen(port, () => {
  debug(`listening::${port}`)
});
