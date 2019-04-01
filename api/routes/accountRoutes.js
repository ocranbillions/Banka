import { Router } from 'express';
import AccountController from '../controllers/accountController';


const router = Router();

// Handles request for all accounts
router.get('/', (req, res) => {
  const results = AccountController.getAccounts();
  return res.json({
    data: results,
    status: 200,
  });
});

// Handles request for single account
router.get('/:acct_number', (req, res) => {
  const account = AccountController.getSingleAccount(req.params.acct_number);

  if (account === undefined) {
    return res.status(404).json({
      errorMessage: 'The account with the given number was not found',
      status: 404,
    });
  }
  // Return retrived account
  return res.json({
    data: account,
    status: 200,
  });
});

// Handles request for creating an account
router.post('/', (req, res) => {
  const result = AccountController.addAccount(req.body);

  // Bad request, error in user inputs
  if (result.error) {
    return res.status(400).json({
      message: result.error.message,
      status: 400,
    });
  }

  // Return newly created account
  const newAccount = result;
  return res.json({
    data: newAccount,
    status: 200,
  });
});


router.patch('/:acct_number', (req, res) => {
  const result = AccountController.changeAccountStatus(req.params.acct_number, req.body);

  if (result === 404) {
    return res.status(404).json({
      errorMessage: 'The account with the given number was not found',
      status: 404,
    });
  }

  if (result === 401) {
    return res.status(401).json({
      errorMessage: 'Account status can only be \'active\' or \'dormant\'',
      status: 401,
    });
  }

  // Status was successfuly changed
  const account = result;

  return res.json({
    accountNumber: account.accountNumber,
    accounStatus: account.status,
  });
});


router.delete('/:acct_number', (req, res) => {
  const result = AccountController.deleteAccount(req.params.acct_number);

  if (result === 404) {
    return res.status(404).json({
      errorMessage: 'The account with the given number was not found',
      status: 404,
    });
  }
  // Deleted item was returned
  return res.json({
    message: 'Account successfully deleted',
    status: 200,
  });
});

export default router;
