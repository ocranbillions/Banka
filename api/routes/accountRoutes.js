import { Router } from 'express';
import AccountController from '../controllers/accountController';

const router = Router();

// HANDLES REQUEST FOR GETTING ALL ACCOUNTS
router.get('/', (req, res) => {
  const accounts = AccountController.getAccounts();

  return res.json({
    data: accounts,
    status: 200,
  });
});


// HANDLES REQUEST FOR GETTING A SINGLE ACCOUNT
router.get('/:number', (req, res) => {
  const account = AccountController.getSingleAccount(req.params.number);

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


// HANDLES REQUEST FOR CREATING AN ACCOUNT
router.post('/', (req, res) => {
  const result = AccountController.addAccount(req.body);

  // Bad request, error in user inputs
  if (result.error) {
    return res.status(400).json({
      errorMessage: result.error.message,
      status: 400,
    });
  }

  // Return newly created account
  const newAccount = result;
  return res.status(201).json({
    data: newAccount,
    status: 201,
  });
});


// HANDLES REQUEST FOR DELETING AN ACCOUNT
router.delete('/:number', (req, res) => {
  const result = AccountController.deleteAccount(req.params.number);

  if (result === 404) {
    return res.status(404).json({
      errorMessage: 'The account with the given number was not found',
      status: 404,
    });
  }
  // Deleted item was returned
  return res.status(202).json({
    message: 'Account successfully deleted',
    status: 202,
  });
});


// HANDLES REQUEST FOR CHANGING ACCOUNT STATUS
router.patch('/:number', (req, res) => {
  const result = AccountController.changeAccountStatus(req.params.number, req.body);

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
  return res.status(201).json({
    data: account,
    message: 'Account status succesfully changed',
  });
});

export default router;
