import { Router } from 'express';
import UserController from '../controllers/userController';
import validations from '../middlewares/validations';
import Auth from '../middlewares/jwt';

const router = Router();

router.get('/', Auth.isLoggedIn, Auth.denyClient, UserController.getUsers);
router.get('/:id', Auth.isLoggedIn, UserController.getSingleUser);
router.get('/:owneremail/accounts', Auth.isLoggedIn, UserController.getAccountsByOwnerEmail);
router.post('/', Auth.isLoggedIn, Auth.isAdmin, validations.validateNewStaff, UserController.addStaff);
router.delete('/:userId', Auth.isLoggedIn, Auth.isAdmin, UserController.deleteUser);

export default router;
