import moment from 'moment';
import db from '../db/index';
import AccountServices from './accountServices';


const TransactionServices = {

  async getAllTransactions() {
    const searchQuery = 'SELECT * FROM transactions';
    const result = await db.query(searchQuery);
    return result.rows;
  },

  async getTransactionById(transactionId) {
    const searchQuery = 'SELECT * FROM transactions WHERE id=$1';
    const result = await db.query(searchQuery, [transactionId]);
    return result;
  },

  async makeTransaction(accountNum, transaction) {
    // lookup account
    const resp = await AccountServices.getSingleAccount(accountNum);
    if (resp.rows < 1) return false;

    const date = moment(new Date());
    const oldbalance = resp.rows[0].balance;
    let newbalance;

    switch (transaction.type) {
      case 'debit':
        newbalance = oldbalance + (-transaction.amount);
        if (newbalance < transaction.amount) return 'Insufficient funds';
        break;
      case 'credit':
        newbalance = oldbalance + transaction.amount;
        break;
      default:
        return 'Wrong transaction type';
    }

    await AccountServices.updateAccountBalance(newbalance, accountNum);

    const insertQuery = `INSERT INTO transactions(createdon, type, accountnumber, amount, cashier, oldbalance, newbalance) 
    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

    const result = await db.query(insertQuery, [date, transaction.type, accountNum, transaction.amount, transaction.cashier, oldbalance, newbalance]);
    return result.rows[0];
  },

};

export default TransactionServices;
