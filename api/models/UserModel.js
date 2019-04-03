class User {
  constructor(newUser) {
    this.email = newUser.email;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.password = newUser.password;
    this.type = 'client';
    this.isAdmin = 0;
  }
}

export default User;
