/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.on('connect', () => {
  console.log('connected to the database');
});

export default db;
