class Account {
  constructor(newAccount) {
    this.firstName = newAccount.firstName;
    this.lastName = newAccount.lastName;
    this.email = newAccount.email;
    this.type = newAccount.type;
    this.openingBalance = newAccount.openingBalance;

    this.accountNumber = 2541236521; // Create helper method to generate 10 random digits here
    this.createdOn = new Date(); // Use date method or momements to generate date/time here
    this.status = 'Active';
  }
}

export default Account;
