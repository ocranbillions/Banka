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

  addAccount(acct) {
    // Validate form input
    // Define input requirements
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(10).required(),
      type: Joi.string().min(5).required(),
      openingBalance: Joi.string().min(4).required(),
    };

    const result = Joi.validate(acct, schema);
    if (result.error) return result;

    acct.accountNumber = 2541236521;
    acct.createdOn = '22-02-2019 10:53:58';
    acct.status = 'Active';
    acct.id = accounts.length + 1;

    accounts.push(acct);
    const lastItem = accounts[accounts.length - 1];

    return lastItem;
  },

  deleteAccount(num) {
    // Lookup the account
    const accountNumber = parseInt(num, RADIX);
    const index = accounts.findIndex(acct => acct.accountNumber === accountNumber);

    // NOTE: findIndex returns -1 if item not found
    if (index === -1) return 404;

    // Return deleted account;
    return accounts.splice(index, 1);
  },
};

export default AccountController;
