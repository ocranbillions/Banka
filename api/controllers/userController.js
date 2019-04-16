import bcrypt from 'bcrypt-nodejs';
import jsdb from '../jsdb/db';
import User from '../models/UserModel';
import helpers from '../helpers/helpers';

const { users } = jsdb;
const { usersLogins } = jsdb;
const BASE = 10;

const UserController = {

  getUsers(req, res) {
    // const allMeals = MealService.fetchAllMeals();
    return res.json({
      users,
      status: 'success',
    });
    // return db.query('Select * from logins')
    //   .then(res => res)
    //   .catch(err => err);
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
