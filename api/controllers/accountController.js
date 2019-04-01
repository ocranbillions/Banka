import db from '../jsdb/db';
import helpers from '../helpers/helpers';
import Account from '../models/AccountModel';

const { accounts } = db;
const RADIX = 10;

const AccountController = {

  getAccounts() {
    return accounts;
  },

  getSingleAccount(num) {
    const accountNumber = parseInt(num, RADIX);
    const result = accounts.find(acct => acct.accountNumber === accountNumber);
    return result;
  },

  addAccount(reqBody) {
    const result = helpers.validateNewAccount(reqBody);
    if (result.error) return result;

    const newAccount = new Account(reqBody);

    newAccount.id = accounts.length + 1;
    accounts.push(newAccount);

    // Return newly created account
    return accounts[accounts.length - 1];
  },

  deleteAccount(num) {
    const accountNumber = parseInt(num, RADIX);
    const index = accounts.findIndex(acct => acct.accountNumber === accountNumber);

    // NOTE: findIndex returns -1 if item not found
    if (index === -1) return 404;

    const deletedAccount = accounts.splice(index, 1);
    return deletedAccount;
  },

  changeAccountStatus(num, reqBody) {
    const accountNumber = parseInt(num, RADIX);
    const index = accounts.findIndex(acct => acct.accountNumber === accountNumber);

    if (index === -1) return 404; // Account not found
    if (reqBody.status !== 'active' && reqBody.status !== 'dormant') return 401; // Bad request

    // Change status
    accounts[index].status = reqBody.status;

    // Return account
    return accounts[index];
  },

};

export default AccountController;
