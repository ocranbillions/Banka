import Joi from 'joi';

const Helpers = {
  validateNewAccount(formData) {
    // Define requirements
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(10).required(),
      type: Joi.string().min(5).required(),
      openingBalance: Joi.string().min(4).required(),
    };

    return Joi.validate(formData, schema);
  },

  validateTransaction(transaction) {
    const schema = {
      transactionType: Joi.string().min(5).required(),
      amount: Joi.number().min(100).required(), // Joi not validating number properly
      cashier: Joi.number().min(2).required(),
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

  validateNewStaff(staff) {
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(10).required(),
      password: Joi.string().min(5).required(),
      type: Joi.string().min(5).required(),
      isAdmin: Joi.string().min(1).required(),
    };

    return Joi.validate(staff, schema);
  },

  // Next helper method

};

export default Helpers;
