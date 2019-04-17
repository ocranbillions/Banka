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
    const user = result.rows;
    return res.json({
      data: user,
      status: 200,
    });
  },

  async addStaff(req, res) {
    const result = await UserServices.addStaff(req.body);

    if (result.rowCount > 0) {
      return res.status(406).json({
        errorMessage: 'Email already taken',
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
