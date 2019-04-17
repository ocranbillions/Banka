class Teller {
  constructor(newTeller) {
    this.amount = newTeller.amount;
    this.account = newTeller.accountNumber;
    this.transactionType = newTeller.transactionType;

    this.status = 'pending';
    this.date = new Date();
  }
}

export default Teller;
