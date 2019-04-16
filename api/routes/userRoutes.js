import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

// HANDLES REQUEST FOR GETTING ALL USERS
router.get('/', UserController.getUsers);


// HANDLES REQUEST FOR GETTING A SINGLE USER
router.get('/:number', UserController.getSingleUser);
// const user = UserController.getSingleUser(req.params.number);

// if (user === undefined) {
//   return res.status(404).json({
//     errorMessage: 'The user with the given number was not found',
//     status: 404,
//   });
// }
// // Return retrived user
// return res.json({
//   data: user,
//   status: 200,
// });
// });


// // HANDLES REQUEST FOR CREATING A NEW STAFF
router.post('/', (req, res) => {
  const result = UserController.addStaff(req.body);

  // Bad request, error in user inputs
  if (result.error) {
    return res.status(400).json({
      message: result.error.message,
      status: 400,
    });
  }
  if (result === 406) {
    return res.status(406).json({
      errorMessage: 'Email already taken',
      status: 406,
    });
  }
  // Return newly created staff
  const newStaff = result;
  return res.status(201).json({
    data: newStaff,
    status: 201,
  });
});


// // HANDLES REQUEST FOR DELETING A USER
router.delete('/:userId', (req, res) => {
  const result = UserController.deleteUser(req.params.userId);

  if (result === 404) {
    return res.status(404).json({
      errorMessage: 'The user with the given number was not found',
      status: 404,
    });
  }
  // Deleted item was returned
  return res.status(202).json({
    message: 'User successfully deleted',
    status: 202,
  });
});

export default router;
