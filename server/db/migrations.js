const createTables = `
  DROP TABLE IF EXISTS accounts cascade;
  DROP TABLE IF EXISTS users cascade;
  DROP TABLE IF EXISTS logins cascade;
  DROP TABLE IF EXISTS tellers cascade;
  DROP TABLE IF EXISTS transactions cascade;

  CREATE TABLE IF NOT EXISTS
  accounts(
    id SERIAL PRIMARY KEY,
    accountNumber BIGINT NOT NULL,
    createdON TIMESTAMP,
    owner INT NOT NULL,
    type VARCHAR(128) NOT NULL,
    balance FLOAT NOT NULL,
    status VARCHAR(128) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    type VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  logins(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL,
    hash VARCHAR(128) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS
  tellers(
    id SERIAL PRIMARY KEY,
    amount FLOAT NOT NULL,
    accountNumber BIGINT NOT NULL,
    owner VARCHAR(128) NOT NULL,
    transactionType VARCHAR(128) NOT NULL,
    date TIMESTAMP,
    status VARCHAR(128) NOT NULL,
    ownerId INT
  );
  CREATE TABLE IF NOT EXISTS
  transactions(
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP,
    transactionType VARCHAR(128) NOT NULL,        
    accountNumber BIGINT NOT NULL,
    amount FLOAT NOT NULL,
    cashier INT NOT NULL,
    oldBalance FLOAT NOT NULL,
    newBalance FLOAT NOT NULL,
    status VARCHAR(128)
  );
`;

export default createTables;
