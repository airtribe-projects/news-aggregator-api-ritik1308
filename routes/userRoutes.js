const express= require('express');
const router = express.Router();
const signupMiddleware = require('../middleware/authMiddleware');
const authController =require('../controller/authController');



router.post('/signup',signupMiddleware.signup,authController.signup);

module.exports = router;