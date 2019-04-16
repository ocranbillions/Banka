/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';

import createTables from './migrations';
import seedTables from './seeders';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = pool;

pool.on('connect', () => {
  console.log('connected to the db');
});


const createTbls = () => {
  db.query(createTables);
};
const seedTbls = () => {
  db.query(seedTables);
};

createTbls();
seedTbls();

pool.end();


export default {
  createTbls,
  seedTbls,
};
