// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username must be 4 characters or more.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  async function checkDuplicate(req, res, next) {
    const { username, email } = req.body;

    const userNameDupe = await User.findOne({
      where: {username: username}
    })

    if (userNameDupe) {
      const err = new Error('User already exists');
      err.title = 'User already exists';
      err.errors = {
        username: 'User with that username already exists'
      };
      err.status = 500;
      return next(err);
    }

    const userEmailDupe = await User.findOne({
      where: {email: email}
    })

    if (userEmailDupe) {
      const err = new Error('User already exists');
      err.title = 'User already exists';
      err.errors = {
        email: 'User with that email already exists'
      };
      err.status = 500;
      return next(err);
    }

    return next();
  }



router.post(
    '/',
    validateSignup,
    checkDuplicate,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;
