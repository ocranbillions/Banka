import moment from 'moment';
import helpers from '../helpers/helpers';
import dbServices from '../db/config';

const { db } = dbServices;

const AccountController = {

  async getAccounts(query) {
    let searchQuery;
    if (query.status) {
      const { status } = query;
      searchQuery = 'SELECT * FROM accounts WHERE status=$1';
      const result = await db.query(searchQuery, [status]);
      return result.rows;
    }

    searchQuery = 'SELECT * FROM accounts';
    const result = await db.query(searchQuery);
    return result.rows;
  },

  async getSingleAccount(accountNum) {
    const searchQuery = 'SELECT * FROM accounts WHERE accountnumber=$1';
    const result = await db.query(searchQuery, [accountNum]);
    return result;
  },

  async getAccountTransactions(accountNum) {
    const searchQuery = 'SELECT * FROM transactions WHERE accountnumber=$1';
    const result = await db.query(searchQuery, [accountNum]);
    return result;
  },

  async addAccount(reqBody) {
    const num = helpers.generateAccountNumber();
    const date = moment(new Date());
    const status = 'active';
    const { owneremail, type, openingBalance } = reqBody;

    const insertQuery = `INSERT INTO accounts(accountnumber, createdon, owneremail, type, balance, status) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    const result = await db.query(insertQuery, [num, date, owneremail, type, openingBalance, status]);
    return result.rows[0];
  },

  async deleteAccount(accountNum) {
    const deleteQuery = 'DELETE FROM accounts WHERE accountnumber=$1';
    const result = await db.query(deleteQuery, [accountNum]);
    return result;
  },

  async changeAccountStatus(num, status) {
    const updateQuery = 'UPDATE accounts SET status=$1 WHERE accountnumber=$2 RETURNING *';
    const result = await db.query(updateQuery, [status, num]);
    return result.rows[0];
  },

  async updateAccountBalance(newBalace, accountNumber) {
    const updateQuery = 'UPDATE accounts SET balance=$1 WHERE accountnumber=$2 RETURNING *';
    const result = await db.query(updateQuery, [newBalace, accountNumber]);
    return result.rows[0];
  }

};

export default AccountController;
