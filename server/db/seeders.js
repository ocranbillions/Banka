/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';
import moment from 'moment';

const date = moment(new Date());
const seedTables = `
  INSERT INTO
    users
      VALUES 
      ( default, 'mikejones@gmail.com', 'Mike', 'Jones', 'staff', ${true}, 'somesecret'),
      ( default, 'samo@gmail.com', 'Samuel', 'Ocran', 'client', ${false}, '$2b$10$iKtnb658ePsLlpbAUVGEb.EsSbv/8aateaYMaa4xV.9qe4xSIwjWS'),
      ( default, 'davidjackson@gmail.com', 'David', 'Jackons', 'client', ${false}, 'someverywickedsecrett');
  INSERT INTO
    accounts
      VALUES 
      ( default, 4194194410, '${date}', 'joe@gmail.com', 'current', 50000.10, 'active'),
      ( default, 2154523214, '${date}', 'mike@gmail.com', 'savings', 2541.22, 'active'),
      ( default, 5421214520, '${date}', 'dave@aol.com', 'savings', 45000.50, 'active'),
      ( default, 1212452132, '${date}', 'joe@gmail.com', 'savings', 30000.10, 'dormant');
  INSERT INTO
    transactions
      VALUES 
      ( default, '${date}', 'credit', 7541253210, 25410.00, 2, 214410.20, 2111.20),
      ( default, '${date}', 'credit', 9852136521, 12000.20, 2, 1252.20, 2000.20),
      ( default, '${date}', 'credit', 1245211123, 15000.20, 2, 10200.20, 12000.20); 
`;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('db connection established');
});

async function seed() {
  await pool.query(seedTables);
  console.log('seeding tables...');
  pool.end();
}

seed();
export default seed;
