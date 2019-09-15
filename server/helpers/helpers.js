import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Helpers = {
  createToken(id, email, firstName, lastName, type, isadmin) {
    const token = jwt.sign(
      { id, email, firstName, lastName, type, isadmin },
      process.env.SECRET,
      { expiresIn: '1day' },
    );
    return token;
  },

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  },

  checkServerError(queryResult, responseObject) {
    if (queryResult.name === 'error') {
      return responseObject.status(500).json({
        status: 500,
        errorMessage: 'An unexpected error occured',
      });
    }
  }
  // Next helper method

};

export default Helpers;
