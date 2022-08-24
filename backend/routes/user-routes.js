const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
//   getSingleUser,
//   showCurrentUser,
//   updateUser,
//   updateUserPassword,
} = require('../controllers/user-controller');

router
  .route('/').get(getAllUsers)
//   .get(authenticateUser, authorizePermissions('teacher'), getAllUsers);

// router.route('/showMe').get(authenticateUser, showCurrentUser);
// router.route('/updateUser').patch(authenticateUser, updateUser);
// router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

// router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
