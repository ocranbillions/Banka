import { Router } from 'express';
import AccountController from '../controllers/accountController';
import validations from '../middlewares/validations';
import Auth from '../middlewares/auth';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.isStaff, AccountController.getAccounts);
router.post('/', Auth.isLoggedIn, validations.validateNewAccount, AccountController.createAccount);
router.get('/:accountNumber', Auth.isLoggedIn, AccountController.getSingleAccount);
router.get('/:accountNumber/transactions', Auth.isLoggedIn, AccountController.getAccountTransactions);
router.delete('/:accountNumber', Auth.isLoggedIn, Auth.isAdmin, AccountController.deleteAccount);
router.patch('/:accountNumber', Auth.isLoggedIn, Auth.isAdmin, AccountController.changeAccountStatus);

export default router;
