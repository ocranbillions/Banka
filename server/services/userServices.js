/* eslint-disable no-else-return */
/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import db from '../db/index';

const UserController = {

  async getUsers() {
    const searchQuery = 'SELECT * FROM users';
    const result = await db.query(searchQuery);

    return result.rows;
  },

  async getSingleUser(id) {
    const searchQuery = 'SELECT * FROM users WHERE id=$1';
    const result = await db.query(searchQuery, [id]);
    return result;
  },

  async addStaff(staff) {
    const insertQuery = `INSERT INTO users(email, firstName, lastName, type, isAdmin, password) 
                              VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(staff.password, salt);
    let result;
    try {
      result = await db.query(insertQuery, [staff.email, staff.firstName, staff.lastName, 'staff', staff.isAdmin, hashedPassword]);
    } catch (err) {
      return err;
    }
    return result.rows[0];
  },

  async deleteUser(id) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1';
    const result = await db.query(deleteQuery, [id]);
    return result;
  },
};

export default UserController;
