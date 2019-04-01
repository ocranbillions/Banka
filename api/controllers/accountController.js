import Joi from 'joi';
import db from '../jsdb/db';

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
    // Validate form input
    // Define input requirements
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(10).required(),
      type: Joi.string().min(5).required(),
      openingBalance: Joi.string().min(4).required(),
    };

    const result = Joi.validate(reqBody, schema);
    // Error in user input
    if (result.error) return result;

    reqBody.accountNumber = 2541236521;
    reqBody.createdOn = '22-02-2019 10:53:58';
    reqBody.status = 'Active';
    reqBody.id = accounts.length + 1;

    accounts.push(reqBody);

    // Return newly created account
    const lastItem = accounts[accounts.length - 1];
    return lastItem;
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
