const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const { generateToken } = require('../utils/generateToken');
const { registrationValidation } = require('../validation/validate');
const { loginValidation } = require('../validation/validate');
const router = express.Router();

router.get(
  '/all',
  asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);
router.get(
  '/free',
  asyncHandler(async (req, res, next) => {
    const users = await User.find({ accountType: 'free' });
    if (!users) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found',
      });
    }

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);
router.get(
  '/premium',
  asyncHandler(async (req, res, next) => {
    const users = await User.find({ accountType: 'premium' });
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);

router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, url } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const err = new Error('User already registered');
      err.status = 400;
      next(err);
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      url,
    });
    res.json({ message: 'New user created' });
  })
);
router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      next(err);
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        firstName: user.firstName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials', status: 'fail' });
    }
  })
);

router.post(
  '/accountdata',
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    console.log('req body' + req.body);
    console.log(req.body);

    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      res.status(200).json({
        allUserData: user,
      });
    }

    return res.status(404).json({
      message: 'User not found',
    });
  })
);

router.patch(
  '/accountdata',
  asyncHandler(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      city,
      zipCode,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.contactNumber = contactNumber;
      user.address = address;
      user.city = city;
      user.zipCode = zipCode;
      await user.save();
      res.status(200).json({
        message: 'User updated',
      });
    }
    return res.status(404).json({
      message: 'User not found',
    });
  })
);

module.exports = router;
