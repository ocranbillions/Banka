import moment from 'moment';

const date = moment(new Date());
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

// Mike Jones password = somesecret
// Samuel Ocran password = mysecret
const seedTables = `
  INSERT INTO
    users
      VALUES 
      ( default, 'mikejones@gmail.com', 'Mike', 'Jones', 'staff', ${true}, '$2b$10$xjROlDMHpsTydHjouVZDCuPsTlalFeqbcBku6Zy1qy9uvDkewa6va'),
      ( default, 'samo@gmail.com', 'Samuel', 'Ocran', 'client', ${false}, '$2b$10$iKtnb658ePsLlpbAUVGEb.EsSbv/8aateaYMaa4xV.9qe4xSIwjWS'),
      ( default, 'davidjackson@gmail.com', 'David', 'Jackons', 'client', ${false}, 'someverywickedsecrett');
  INSERT INTO
    accounts
      VALUES 
      ( default, 4194194410, '${date}', 'joe@gmail.com', 'current', 50000.10, 'active'),
      ( default, 9852136521, '${date}', 'mike@gmail.com', 'savings', 1000.00, 'active'),
      ( default, 5421214520, '${date}', 'dave@aol.com', 'savings', 45000.50, 'active'),
      ( default, 1212452132, '${date}', 'joe@gmail.com', 'savings', 30000.10, 'dormant');
  INSERT INTO
    transactions
      VALUES 
      ( default, '${date}', 'credit', 7541253210, 25410.00, 2, 214410.20, 2111.20),
      ( default, '${date}', 'credit', 9852136521, 12000.20, 2, 1000.20, 13000.20),
      ( default, '${date}', 'credit', 9852136521, 20000.20, 2, 13000.20, 23000.20),
      ( default, '${date}', 'credit', 1245211123, 15000.20, 2, 10200.20, 12000.20); 
`;

module.exports = {
  createTables,
  seedTables,
};
