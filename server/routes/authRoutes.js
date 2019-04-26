import { Router } from 'express';
import AuthController from '../controllers/authController';
import validations from '../middlewares/validations';

const router = Router();

router.post('/signup', validations.validateSignUp, AuthController.signUp);
router.post('/signin', validations.validateSingnIn, AuthController.signIn);

export default router;
