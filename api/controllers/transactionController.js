import db from '../jsdb/db';
import Transaction from '../models/TransactionModel';
import helpers from '../helpers/helpers';

const { transactions } = db;
const { accounts } = db;
const BASE = 10;

const TransactionController = {

  getAllTransactions() {
    return transactions;
  },

  // getAccountTransactions(number) {
  //   // perform magic here

  //   return magic;
  // },

  creditAccount(number, creditInfo) {
    const accountNumber = parseInt(number, BASE);

    // Lookup account
    const index = accounts.findIndex(acct => acct.accountNumber === accountNumber);
    if (index === -1) return 404;

    // Validate inputs
    const result = helpers.validateTransaction(creditInfo);
    if (result.error) return result;

    // Get old balance and update account
    const oldBalance = accounts[index].balance;
    accounts[index].balance = oldBalance + creditInfo.amount;

    // Create/Post transaction
    const transaction = new Transaction(accounts[index], oldBalance, creditInfo);
    transaction.transactionId = transactions.length + 1;
    transactions.push(transaction);

    return transactions[transactions.length - 1]; // Return transaction
  },


  debitAccount(number, debitInfo) {
    const accountNumber = parseInt(number, BASE);

    // Lookup account
    const index = accounts.findIndex(acct => acct.accountNumber === accountNumber);
    if (index === -1) return 404;

    // Validate inputs
    const result = helpers.validateTransaction(debitInfo);
    if (result.error) return result;

    // Insufficient funds? Reject!
    if (accounts[index].balance < debitInfo.amount) return 406;

    // Get old balance and update account
    const oldBalance = accounts[index].balance;
    accounts[index].balance = oldBalance + (-debitInfo.amount);

    // Create/Post transaction
    const transaction = new Transaction(accounts[index], oldBalance, debitInfo);
    transaction.transactionId = transactions.length + 1;
    transactions.push(transaction);

    return transactions[transactions.length - 1]; // Return transaction
  },

};

export default TransactionController;
