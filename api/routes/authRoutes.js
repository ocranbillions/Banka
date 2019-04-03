import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

// HANDLES SIGNIN ROUTE
router.post('/signin', (req, res) => {
  const response = AuthController.signIn(req.body);

  if (response === 400) {
    return res.status(400).json({
      errorMessage: 'Both fields must be filled',
      status: 400,
    });
  }
  if (response === 406) {
    return res.status(406).json({
      errorMessage: 'Incorrect login information',
      status: 406,
    });
  }

  return res.status(201).json({
    data: response,
    status: 201,
  });
});


// HANDLES SIGNUP ROUTE
router.post('/signup', (req, res) => {
  const response = AuthController.signUp(req.body);

  if (response.error) {
    return res.status(400).json({
      errorMessage: response.error.message,
      status: 400,
    });
  }
  if (response === 406) {
    return res.status(406).json({
      errorMessage: 'Email already taken',
      status: 406,
    });
  }

  return res.status(201).json({
    data: response,
    status: 201,
  });
});

export default router;
