require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const db = process.env.DB_NAME;
const client = new MongoClient(uri);

if (!uri) {
  throw new Error('Missing MONGO_URI');
}

async function connect() {
  await client.connect();
  console.log('Connecting to mongo db...');
  return client.db(db);
}

async function disconnect() {
  console.log('Disconnecting to mongo db...');
  await client.close();
} // checck here 

module.exports = { connect, disconnect };
