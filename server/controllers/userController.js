import UserServices from '../services/userServices';

const UserController = {

  async getUsers(req, res) {
    const users = await UserServices.getUsers();
    return res.json({
      data: users,
      status: 200,
    });
  },

  async getSingleUser(req, res) {
    const result = await UserServices.getSingleUser(req.params.id);

    if (result.rows < 1) {
      return res.status(404).json({
        errorMessage: 'The user with the given number was not found',
        status: 404,
      });
    }
    // Return retrived user
    const user = result.rows[0];
    return res.json({
      data: user,
      status: 200,
    });
  },


  async getAccountsByOwnerEmail(req, res) {
    const result = await UserServices.getAccountsByOwnerEmail(req.params.owneremail);

    if (result.rows < 1) {
      return res.status(404).json({
        errorMessage: 'No accounts for this user yet',
        status: 404,
      });
    }
    // Return retrived account
    const accounts = result.rows;
    return res.json({
      data: accounts,
      status: 200,
    });
  },

  async addStaff(req, res) {
    const result = await UserServices.addStaff(req.body);

    if (result.name === 'error') {
      return res.status(406).json({
        errorMessage: 'Email already used',
        status: 406,
      });
    }
    // Return newly created staff
    const newStaff = result;
    return res.status(201).json({
      data: newStaff,
      status: 201,
    });
  },

  async deleteUser(req, res) {
    const result = await UserServices.deleteUser(req.params.userId);

    if (result.rowCount < 1) {
      return res.status(404).json({
        errorMessage: 'The user with the given number was not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'User successfully deleted',
      status: 200,
    });
  },

};

export default UserController;
