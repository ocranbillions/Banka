import db from '../jsdb/db';
import Transaction from '../models/TransactionModel';
import helpers from '../helpers/helpers';

const { transactions } = db;
const { accounts } = db;
const { tellers } = db;

const TransactionController = {

  getAllTransactions() {
    return transactions;
  },

  getAccountTransactions(number) {
    const accountNumber = parseInt(number, 10);
    const accountTransactions = transactions.filter(acct => acct.accountNumber === accountNumber);

    // No content
    if (accountTransactions.length < 1) return 204;

    return accountTransactions;
  },

  creditAccount(number, creditInfo) {
    const accountNumber = parseInt(number, 10);
    const account = accounts.find(acct => acct.accountNumber === accountNumber);
    if (account === undefined) return 404;


    // Validate inputs
    const result = helpers.validateTransaction(creditInfo);
    if (result.error) return result;

    // Check client's submitted teller
    const teller = tellers.find(t => t.tellerNumber === creditInfo.tellerNumber);
    if (teller === undefined) return 404;


    // Proceed only if client's submitted teller is not already processed
    // (So we don't credit the client twice)
    if (teller.status !== 'processed') {
      const oldBalance = account.balance;
      account.balance = oldBalance + creditInfo.amount;

      // Create/Post transaction
      const transaction = new Transaction(account, oldBalance, creditInfo);
      transaction.transactionId = transactions.length + 1;
      transactions.push(transaction);

      // Change teller status to 'processed'
      helpers.updateTellerStatus(creditInfo.tellerNumber);

      return transactions[transactions.length - 1]; // Return transaction
    }

    // The teller number is alredy processed
    return 'processed';
  },


  debitAccount(number, debitInfo) {
    const accountNumber = parseInt(number, 10);
    const account = accounts.find(acct => acct.accountNumber === accountNumber);
    if (account === undefined) return 404;

    // Validate inputs
    const result = helpers.validateTransaction(debitInfo);
    if (result.error) return result;

    // Check client's submitted teller
    const teller = tellers.find(t => t.tellerNumber === debitInfo.tellerNumber);
    if (teller === undefined) return 404;

    // Check client's balance. reject if insufficent
    if (account.balance < debitInfo.amount) return 406;

    // Proceed only if client's submitted teller is not already processed
    if (teller.status !== 'processed') {
      // Get old balance and update account
      const oldBalance = account.balance;
      account.balance = oldBalance + (-debitInfo.amount);

      // Create/Post transaction
      const transaction = new Transaction(account, oldBalance, debitInfo);
      transaction.transactionId = transactions.length + 1;
      transactions.push(transaction);

      helpers.updateTellerStatus(debitInfo.tellerNumber);

      return transactions[transactions.length - 1]; // Return transaction
    }
    // The teller number is alredy processed
    return 'processed';
  },

};

export default TransactionController;
