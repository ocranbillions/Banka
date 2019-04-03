import db from '../jsdb/db';
import User from '../models/UserModel';
import helpers from '../helpers/helpers';


const { users } = db;
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

  addStaff(reqBody) {
    const result = helpers.validateNewStaff(reqBody);
    if (result.error) return result;

    const user = users.find(u => u.email === reqBody.email);
    // Create new staff if not exit
    if (user === undefined) {
      const newStaff = new User(reqBody);

      newStaff.id = users.length + 1;
      newStaff.type = reqBody.type;
      newStaff.isAdmin = reqBody.isAdmin;
      users.push(newStaff);

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
