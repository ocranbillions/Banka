import bcrypt from 'bcrypt-nodejs';
import db from '../jsdb/db';
import User from '../models/UserModel';
import helpers from '../helpers/helpers';

const { users } = db;
const { usersLogins } = db;
const BASE = 10;

const UserController = {

  getUsers() {
    return users;
  },

  getSingleUser(id) {
    const userId = parseInt(id, BASE);
    const result = users.find(u => u.id === userId);
    return result;
  },

  addStaff(staff) {
    const result = helpers.validateNewStaff(staff);
    if (result.error) return result;

    const user = users.find(u => u.email === staff.email);
    // Create new staff if not exit
    if (user === undefined) {
      const newStaff = new User(staff);
      newStaff.id = users.length + 1;
      newStaff.type = staff.type;
      newStaff.isAdmin = staff.isAdmin;

      users.push(newStaff);

      const hashedPassword = bcrypt.hashSync(staff.password);
      usersLogins.push({
        email: newStaff.email,
        hash: hashedPassword,
      });

      // Return newly created account
      return users[users.length - 1];
    }

    // Rejected: Email already taken
    return 406;
  },

  deleteUser(id) {
    const userId = parseInt(id, BASE);
    const index = users.findIndex(u => u.id === userId);

    // NOTE: findIndex returns -1 if item not found
    if (index === -1) return 404;

    const deletedUser = users.splice(index, 1);
    return deletedUser;
  },

};

export default UserController;
