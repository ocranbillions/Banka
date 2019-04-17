import { Router } from 'express';
import AccountController from '../controllers/accountController';
import validations from '../middlewares/validations';

const router = Router();

router.get('/', AccountController.getAccounts);
router.post('/', validations.validateNewAccount, AccountController.addAccount);
router.get('/:number', AccountController.getSingleAccount);
router.delete('/:number', AccountController.deleteAccount);
router.patch('/:number', AccountController.changeAccountStatus);

export default router;
