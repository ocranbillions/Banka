import { Router } from 'express';
import AccountController from '../controllers/accountController';
import validations from '../middlewares/validations';
import jwt from '../middlewares/jwt';

const router = Router();

router.get('/', jwt.isLoggedIn, AccountController.getAccounts);
router.post('/', validations.validateNewAccount, AccountController.addAccount);
router.get('/:accountNumber', AccountController.getSingleAccount);
router.get('/:accountNumber/transactions', AccountController.getAccountTransactions);
router.delete('/:accountNumber', AccountController.deleteAccount);
router.patch('/:accountNumber', AccountController.changeAccountStatus);

export default router;
