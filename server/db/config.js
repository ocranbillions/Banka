/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';
import migrationScript from './migration';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.on('connect', () => {
  console.log('database connected');
});

async function migrate() {
  await db.query(migrationScript.createTables);
}
async function seed() {
  await db.query(migrationScript.seedTables);
}
module.exports = {
  db,
  migrate,
  seed,
};

require('make-runnable');
