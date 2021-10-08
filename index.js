const config = require('config');
const { MongoClient, Db, ObjectId } = require('mongodb');

// get config vars
const DB_URL = config.get('db.url');
const DB_NAME = config.get('db.name');
const DB_DEBUG = config.get('db.debug');

// check config vars
if (!DB_URL) {
  throw new Error('db.url not configured.')
}
if (!DB_NAME) {
  throw new Error('db.name not configured.')
}
if (!DB_DEBUG) {
  throw new Error('db.debug not configured.')
}

// global vars
const debug = require('debug')(DB_DEBUG);
let _client = null;
let _db = null;

/**
 * Connect to the database.
 * @returns {Promise<Db>} the database
 */
async function connect() {
  if (!_db) {
    _client = await MongoClient.connect(DB_URL);
    _db = _client.db(DB_NAME);
    debug('Connected.');
  }
  return _db;
}

/**
 * Ping the databases.
 */
async function ping() {
  const db = await connect();
  await db.command({ ping: 1 });
  debug('Ping.');
}

/**
 * Generate a new ObjectId or parse one from a string.
 * @param {undefined|String|ObjectId} str the string to be parsed (optional)
 * @returns {ObjectId}
 */
function newId(str) {
  return ObjectId(str);
}

module.exports = {
  connect,
  ping,
  newId,
};
