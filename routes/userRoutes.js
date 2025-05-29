const express= require('express');
const router = express.Router();
const signupMiddleware = require('../middleware/authMiddleware');
const authController =require('../controller/authController');
const userController = require('../controller/userController');



router.post('/signup',signupMiddleware.signup,authController.signup);
router.post('/login',authController.login);
router.get('/preferences', authController.protect, userController.preferences);
router.put('/preferences',authController.protect,userController.setPreferences);
//next

module.exports = router;