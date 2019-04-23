import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Helpers = {
  createToken(email, type, isadmin) {
    const token = jwt.sign(
      { email, type, isadmin },
      process.env.SECRET,
      { expiresIn: '7days' },
    );
    return token;
  },

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  },
  // Next helper method

};

export default Helpers;
