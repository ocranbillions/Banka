import bcrypt from 'bcrypt';
import helpers from '../helpers/helpers';
import AuthServices from '../services/authServices';

const AuthController = {

  /**
   * @description sign up a new user
   * @method signUp
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async signUp(req, res) {
    const result = await AuthServices.signUp(req.body);
    if (result.constraint === 'users_email_key') {
      return res.status(409).json({
        status: 409,
        errorMessage: 'Email already used',
      });
    }

    const newUser = result.rows[0];
    const token = helpers.createToken(newUser.id, newUser.email, newUser.firstname, newUser.lastname, newUser.type, newUser.isadmin);

    return res.status(201).json({
      status: 201,
      data: { token, ...newUser },
    });
  },

  /**
   * @description sign in a user
   * @method signIn
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */
  async signIn(req, res) {
    const result = await AuthServices.signIn(req.body);
    helpers.checkServerError(result, res);

    // Wrong email || password
    if (result.rows < 1 || !bcrypt.compareSync(req.body.password, result.rows[0].password)) {
      return res.status(400).json({
        status: 400,
        errorMessage: 'Incorrect login information',
      });
    }

    const user = result.rows[0];
    const token = helpers.createToken(user.id, user.email, user.firstname, user.lastname, user.type, user.isadmin);
    const {
      id, email, firstname, lastname, type, isadmin,
    } = user;

    return res.status(201).json({
      status: 201,
      data: {
        token, id, email, firstname, lastname, type, isadmin,
      },
    });
  },
};

export default AuthController;
