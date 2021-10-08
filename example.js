const debug = require('debug')('app:example');
const debugError = require('debug')('app:error');
const { connect, ping, newId } = require('./index');

Promise.resolve(ping())
  .then(() => debug('Done.'))
  .catch((err) => debugError(err));
