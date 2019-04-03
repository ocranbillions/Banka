import db from '../jsdb/db';
import User from '../models/UserModel';
import helpers from '../helpers/helpers';

const { users } = db;

const AuthController = {
  signIn(login) {
    if (login.email === '' || login.password === '') return 400;

    const index = users.findIndex(u => u.email === login.email);
    if (index === -1) return 406; // Rejected: No such user

    if (users[index].password === login.password) {
      // Return user info without the password
      return {
        token: null,
        id: users[index].id,
        firstName: users[index].firstName,
        lastName: users[index].lastName,
        email: users[index].email,
        type: users[index].type,
        isAdmin: users[index].isAdmin,
      };
    }
    return 406; // Rejected: Incorrect password
  },

  signUp(register) {
    const result = helpers.validateNewClient(register);
    if (result.error) return result;

    const user = users.find(u => u.email === register.email);
    // Create new user if not exit
    if (user === undefined) {
      const newUser = new User(register);
      newUser.id = users.length + 1;
      users.push(newUser);

      // Get new client and return with token
      const usr = users[users.length - 1];
      usr.token = null;

      return usr;
    }

    // Rejected: Email already taken
    return 406;
  },
};

export default AuthController;
