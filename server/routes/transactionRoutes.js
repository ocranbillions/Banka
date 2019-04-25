import { Router } from 'express';
import TransactionController from '../controllers/transactionController';
import validations from '../middlewares/validations';
import Auth from '../middlewares/jwt';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.denyNonStaff, TransactionController.getAllTransactions);
router.get('/:id', Auth.isLoggedIn, TransactionController.getTransactionById);
router.post('/:accountNumber/credit', Auth.isLoggedIn, Auth.isCashier, validations.validateTransaction, TransactionController.makeTransaction);
router.post('/:accountNumber/debit', Auth.isLoggedIn, Auth.isCashier, validations.validateTransaction, TransactionController.makeTransaction);

export default router;
