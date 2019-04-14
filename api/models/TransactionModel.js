class Transaction {
  constructor(account, oldBal, trans) {
    this.createdOn = new Date();
    this.transactionType = trans.transactionType;
    this.accountNumber = account.accountNumber;
    this.amount = trans.amount;
    this.oldBalance = oldBal;
    this.newBalance = account.balance;
    this.cashier = trans.cashier;

    this.tellerNumber = trans.tellerNumber;
    this.status = 'completed';
  }
}

export default Transaction;
