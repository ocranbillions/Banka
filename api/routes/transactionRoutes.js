import { Router } from 'express';
import TransactionController from '../controllers/transactionController';

const router = Router();

// HANDLES REQUEST FOR GETTING ALL TRANSACTIONS
router.get('/', (req, res) => {
  const allTransactions = TransactionController.getAllTransactions();

  return res.json({
    data: allTransactions,
    staus: 200,
  });
});


// // HANDLES REQUEST FOR GETTING ALL TRANSACTIONS ON A SPECIFIED ACCOUNT
// router.get('/:number', (req, res) => {
// const accountTransactions = TransactionController.getAccountTransactions(req.params.number);

//   return res.json({
//     data: accountTransactions,
//     staus: 200,
//   });
// });

// HANDLES CREDIT REQUESTS
router.post('/:number/credit', (req, res) => {
  const result = TransactionController.creditAccount(req.params.number, req.body);

  // Bad request, error in user inputs
  if (result.error) {
    return res.status(400).json({
      message: result.error.message,
      status: 400,
    });
  }

  // Return new transaction
  const newTransaction = result;
  return res.status(201).json({
    data: newTransaction,
    status: 201,
  });
});


// HANDLES DEBIT REQUESTS
router.post('/:number/debit', (req, res) => {
  const result = TransactionController.debitAccount(req.params.number, req.body);

  // Bad request, error in user inputs
  if (result.error) {
    return res.status(400).json({
      message: result.error.message,
      status: 400,
    });
  }
  // Insufficient funds
  if (result === 406) {
    return res.status(406).json({
      message: 'You don not have sufficient funds for this transaction.',
      status: 406,
    });
  }
  // Return new transaction
  const newTransaction = result;
  return res.status(201).json({
    data: newTransaction,
    status: 201,
  });
});

export default router;
