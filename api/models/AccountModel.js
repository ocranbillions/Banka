class Account {
  constructor(newAccount) {
    this.firstName = newAccount.firstName;
    this.lastName = newAccount.lastName;
    this.email = newAccount.email;
    this.type = newAccount.type;
    this.balance = newAccount.openingBalance;

    this.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    this.createdOn = new Date();
    this.status = 'Active';
  }
}

export default Account;
