import { Router } from 'express';
import TransactionController from '../controllers/transactionController';
import validations from '../middlewares/validations';
import Auth from '../middlewares/auth';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, TransactionController.getAllTransactions);
router.get('/:id', Auth.isLoggedIn, TransactionController.getTransactionById);
router.post('/:accountNumber/credit', Auth.isLoggedIn, Auth.isStaff, validations.validateTransaction, TransactionController.creditAccount);
router.post('/:accountNumber/debit', Auth.isLoggedIn, Auth.isStaff, validations.validateTransaction, TransactionController.debitAccount);

export default router;
