import { Router } from 'express';
import tellerController from '../controllers/tellerController';

const router = Router();

// HANDLES REQUEST FOR GETTING ALL TELLERS
router.get('/', (req, res) => {
  const tellers = tellerController.getTellers();

  return res.json({
    data: tellers,
    status: 200,
  });
});


// HANDLES REQUEST FOR POSTING A TELLER
router.post('/', (req, res) => {
  const result = tellerController.submitTeller(req.body);

  // Bad request, error in user inputs
  if (result.error) {
    return res.status(400).json({
      errorMessage: result.error.message,
      status: 400,
    });
  }

  const newTeller = result;
  return res.status(201).json({
    data: newTeller,
    status: 201,
  });
});

export default router;
