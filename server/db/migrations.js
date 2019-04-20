/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';

const createTables = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS accounts;
  DROP TABLE IF EXISTS transactions;

  CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL,
    email VARCHAR(128) NOT NULL UNIQUE,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    type VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    password VARCHAR(128) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  accounts(
    id SERIAL PRIMARY KEY,
    accountNumber BIGINT NOT NULL,
    createdON TIMESTAMP,
    ownerEmail VARCHAR(128) NOT NULL,
    type VARCHAR(128) NOT NULL,
    balance FLOAT NOT NULL,
    status VARCHAR(128) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  transactions(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP,
    type VARCHAR(128) NOT NULL,        
    accountNumber BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    cashier INT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL
  );
`;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('db connection established');
});

async function migrate() {
  await pool.query(createTables);
  console.log('creating tables...');
  pool.end();
}

migrate();
export default migrate;
