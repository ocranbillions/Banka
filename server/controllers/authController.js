import bcrypt from 'bcrypt';
import helpers from '../helpers/helpers';
import AuthServices from '../services/authServices';

const AuthController = {

  async signUp(req, res) {
    const result = await AuthServices.signUp(req.body);

    if (result.name === 'error') {
      return res.status(400).json({
        errorMessage: 'Email already used',
        status: 400,
      });
    }

    const newUser = result;
    const token = helpers.createToken(newUser.email, newUser.type, newUser.isadmin);

    return res.status(201).json({
      data: { token, ...newUser },
      status: 201,
    });
  },

  async signIn(req, res) {
    const result = await AuthServices.signIn(req.body);

    // Wrong email or wrong password?
    if (result.rows < 1 || !bcrypt.compareSync(req.body.password, result.rows[0].password)) {
      return res.status(400).json({
        errorMessage: 'Incorrect login information',
        status: 400,
      });
    }

    const user = result.rows[0];
    const token = helpers.createToken(user.email, user.type, user.isadmin);
    const {
      id, email, firstname, lastname, type, isadmin,
    } = user;

    return res.status(201).json({
      data: {
        token, id, email, firstname, lastname, type, isadmin,
      },
      status: 201,
    });
  },
};

export default AuthController;
