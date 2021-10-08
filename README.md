# mongodb-connect
Utility functions to simplify connecting to a MongoDB database.

## Install

Install peer dependencies:

```bash
npm install config debug mongodb
```

Install this package:

```bash
npm install <package-name>
```

## Configuration

This package uses [config](https://www.npmjs.com/package/config) 
to load connection details. As such the following options are used:

* **db.url** - contains the connection string for the database
* **db.name** - contains the database name
* **db.debug** - specifies the [debug](https://www.npmjs.com/package/debug) channel that should be used

Shown below are some example config files:

**config/default.json**
```json
{
  "db": {
    "url": "mongodb://localhost:27017",
    "name": "test",
    "debug": "app:database"
  }
}
```

**config/custom-environment-variables.json**
```json
{
  "db": {
    "url": "DB_URL",
    "name": "DB_NAME",
    "debug": "DB_DEBUG"
  }
}
```

## Usage

Import the utility functions:

```js
const { connect, ping, newId } = require('<package-name>');
```

Test the connectivity:

```js
Promise.resolve(ping())
  .then(() => console.log('Connected to database.'))
  .catch((err) => console.error(err));
```

Find all documents in a collection:

```js
const db = await connect();
const products = await db.collection('products').find({}).toArray();
```

Generate a new ObjectId:

```js
const id = newId();
```

Parse an ObjectId from a string:

```js
const idString = '61608aa55318d3e1f8595804';
const id = newId(idString);
```
