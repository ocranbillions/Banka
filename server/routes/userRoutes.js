import { Router } from 'express';
import UserController from '../controllers/userController';
import validations from '../middlewares/validations';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getSingleUser);
router.get('/:owneremail/accounts', UserController.getAccountsByOwnerEmail);
router.post('/', validations.validateNewStaff, UserController.addStaff);
router.delete('/:userId', UserController.deleteUser);

export default router;
