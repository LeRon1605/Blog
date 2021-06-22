const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const homeController = require('../controllers/homeController');

router.get('/', middleware.isLogin, middleware.isComplete, homeController.index);

module.exports = router;