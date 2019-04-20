import { Router } from 'express';
import TransactionController from '../controllers/transactionController';
import validations from '../middlewares/validations';

const router = Router();

router.get('/', TransactionController.getAllTransactions);
router.get('/:id', TransactionController.getTransactionById);
router.post('/:accountNumber/credit', validations.validateTransaction, TransactionController.makeTransaction);
router.post('/:accountNumber/debit', validations.validateTransaction, TransactionController.makeTransaction);

export default router;
