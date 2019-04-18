import AccountServices from '../services/accountServices';

const AccountController = {

  async getAccounts(req, res) {
    const accounts = await AccountServices.getAccounts();
    return res.json({
      data: accounts,
      status: 200,
    });
  },

  async getSingleAccount(req, res) {
    const result = await AccountServices.getSingleAccount(req.params.accountNumber);

    if (result.rows < 1) {
      return res.status(404).json({
        errorMessage: 'The account with the given number was not found',
        status: 404,
      });
    }
    // Return retrived account
    const account = result.rows;
    return res.json({
      data: account,
      status: 200,
    });
  },

  async addAccount(req, res) {
    const result = await AccountServices.addAccount(req.body);

    // Return newly created account
    const newAccount = result;
    return res.status(201).json({
      data: newAccount,
      status: 201,
    });
  },

  async deleteAccount(req, res) {
    const result = await AccountServices.deleteAccount(req.params.accountNumber);

    if (result.rowCount < 1) {
      return res.status(404).json({
        errorMessage: 'The account with the given number was not found',
        status: 404,
      });
    }
    return res.status(202).json({
      message: 'Account successfully deleted',
      status: 202,
    });
  },

  async changeAccountStatus(req, res) {
    const result = await AccountServices.changeAccountStatus(req.params.accountNumber, req.body.status);

    if (!result) {
      return res.status(404).json({
        errorMessage: 'The account with the given number was not found',
        status: 404,
      });
    }
    return res.status(201).json({
      data: result,
      status: 201,
    });
  },

};

export default AccountController;
