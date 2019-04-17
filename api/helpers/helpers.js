import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../jsdb/db';

dotenv.config();

const Helpers = {

  validateTransaction(transaction) {
    const schema = {
      transactionType: Joi.string().min(5).required(),
      amount: Joi.number().min(100).required(),
      cashier: Joi.number().min(2).required(),
      tellerNumber: Joi.number().min(1).required(),
    };

    return Joi.validate(transaction, schema);
  },

  validateNewClient(client) {
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(10).required(),
      password: Joi.string().min(5).required(),
    };

    return Joi.validate(client, schema);
  },

  createToken(id) {
    const token = jwt.sign(
      { id },
      process.env.SECRET,
      { expiresIn: '1h' },
    );
    return token;
  },

  updateTellerStatus(num) {
    const index = db.tellers.findIndex(t => t.tellerNumber === num);

    // Change status
    db.tellers[index].status = 'processed';

    // Return account
    return db.tellers[index];
  },

  validateNewTeller(tellerInfo) {
    const schema = {
      amount: Joi.number().min(1000).required(),
      accountNumber: Joi.number().min(2).required(),
      transactionType: Joi.string().min(5).required(),
    };

    return Joi.validate(tellerInfo, schema);
  },

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }
  // Next helper method

};

export default Helpers;
