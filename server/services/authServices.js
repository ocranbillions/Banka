/* eslint-disable no-else-return */
/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import db from '../db/index';

const AuthServices = {

  async signUp(user) {
    const insertQuery = `INSERT INTO users(email, firstName, lastName, type, isAdmin, password) 
                              VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    let result;
    try {
      result = await db.query(insertQuery, [user.email, user.firstName, user.lastName, 'client', false, hashedPassword]);
    } catch (err) {
      return err;
    }
    return result.rows[0];
  },

  async signIn(user) {
    const searchQuery = 'SELECT * FROM users WHERE email=$1';
    const result = await db.query(searchQuery, [user.email]);
    return result;
  },
};

export default AuthServices;
