import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Helpers = {
  createToken(id) {
    const token = jwt.sign(
      { id },
      process.env.SECRET,
      { expiresIn: '1h' },
    );
    return token;
  },

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  },
  // Next helper method

};

export default Helpers;
