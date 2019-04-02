class Transaction {
  constructor(account, oldBal, trans) {
    this.createdOn = '12-02-2019 14:53:02'; // use date or moments here;
    this.transactionType = trans.transactionType;
    this.accountNumber = account.accountNumber;
    this.amount = trans.amount;
    this.oldBalance = oldBal;
    this.newBalance = account.balance;
    this.cashier = trans.cashier;
    this.status = 'completed';
  }
}

export default Transaction;
