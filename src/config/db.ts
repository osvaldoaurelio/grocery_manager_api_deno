import { MongoClient } from '../deps.ts';
import { config } from '../deps.ts';

const { MONGO_DB_URI, DB_NAME } = config({ safe: true })

const client = new MongoClient();

client.connectWithUri(MONGO_DB_URI)

const db = client.database(DB_NAME)

export default db;
