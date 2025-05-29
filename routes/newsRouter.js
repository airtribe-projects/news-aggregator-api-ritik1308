const express= require('express');
const router = express.Router();
const newsController = require('../controller/newsController');
const authController = require('../controller/authController');

router.get('/', authController.protect, newsController.getNews);
module.exports = router;