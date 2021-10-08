require('dotenv').config();

const config = require('config');
const debug = require('debug')('app:example');
const debugError = require('debug')('app:error');
const { connect, ping, newId } = require('./index');

async function getAllProducts() {
  const db = await connect();
  const products = await db.collection('products').find({}).toArray();
  return products;
}

async function main() {
  debug('Started.');
  debug('Config:', config.get('db'));
  await ping();
  debug('Connected to database.');
  const products = await getAllProducts();
  debug('Products:', products);
  debug('New ID:', newId());
  debug('Parsed ID:', newId('61608aa55318d3e1f8595804'));
}

Promise.resolve(main())
  .then(() => debug('Done.'))
  .catch((err) => debugError(err));
