import Joi from 'joi';

const Validations = {

  validateNewStaff(req, res, next) {
    const schema = {
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().min(10).required(),
      password: Joi.string().min(5).required(),
      type: Joi.string().min(5).required(),
      isAdmin: Joi.string().min(1).required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        status: 400,
        error: result.error.message,
      });
    }
    return next();
  },

  // next validator here
};

export default Validations;