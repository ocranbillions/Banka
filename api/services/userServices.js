/* eslint-disable no-else-return */
/* eslint-disable no-console */
import polyfill from '@babel/polyfill';
import dbServices from '../db/index';

const { db } = dbServices;

const UserController = {

  async getUsers() {
    const searchQuery = 'SELECT * FROM users';
    const result = await db.query(searchQuery);

    return result.rows;
  },

  async getSingleUser(id) {
    const searchQuery = 'SELECT * FROM users WHERE id=$1';
    const userId = parseInt(id, 10);

    const result = await db.query(searchQuery, [userId]);
    return result;
  },

  async addStaff(staff) {
    const checkUser = 'SELECT * FROM users WHERE email=$1';

    const promise = new Promise((resolve, reject) => {
      const user = db.query(checkUser, [staff.email]);
      resolve(user);
    });

    const user = await promise;
    if (user.rowCount > 0) {
      return user;
    } else {
      const insertQuery = `INSERT INTO users(email, firstName, lastName, type, isAdmin) 
                              VALUES ($1,$2,$3,$4,$5) RETURNING *`;
      const result = await db.query(insertQuery, [staff.email, staff.firstName, staff.lastName, 'staff', true]);

      return result.rows[0];
    }
  },

  async deleteUser(id) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1';
    const userId = parseInt(id, 10);

    const result = await db.query(deleteQuery, [userId]);
    return result;
  },
};

export default UserController;
