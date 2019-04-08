import bcrypt from 'bcrypt-nodejs';
import db from '../jsdb/db';
import User from '../models/UserModel';
import helpers from '../helpers/helpers';


const { users } = db;
const { usersLogins } = db;

const AuthController = {
  signIn(person) {
    if (person.email === '' || person.password === '') return 400;

    const userLogin = usersLogins.find(u => u.email === person.email);
    if (userLogin === undefined) return 406; // Rejected: No such user

    if (bcrypt.compareSync(person.password, userLogin.hash)) {
      const userInfo = users.find(u => u.email === person.email);

      // Return user with token
      const token = helpers.createToken(userInfo.id);
      return {
        token,
        ...userInfo,
      };
    }

    return 406; // Rejected: Incorrect password
  },

  signUp(person) {
    const result = helpers.validateNewClient(person);
    if (result.error) return result;

    const user = users.find(u => u.email === person.email);
    // Create new user if not exit
    if (user === undefined) {
      const newUser = new User(person);
      newUser.id = users.length + 1;

      users.push(newUser);

      const hashedPassword = bcrypt.hashSync(person.password);
      usersLogins.push({
        email: newUser.email,
        hash: hashedPassword,
      });

      // Get new client and return with token
      const token = helpers.createToken(users[users.length - 1].id);
      return {
        token,
        ...users[users.length - 1],
      };
    }

    // Rejected: Email already taken
    return 406;
  },
};

export default AuthController;
