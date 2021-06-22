const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'public/upload/user' });

const middleware = require('../middleware');
const authController = require('../controllers/authController');

router.delete('/deleteFollow/:id', middleware.isLogin, authController.deleteFollow);
router.put('/addFollow/:id', middleware.isLogin, authController.addFollow);
router.get('/login', middleware.preventLogin, authController.loginIndex);
router.post('/login', authController.login);
router.get('/register', middleware.preventLogin, authController.registerIndex);
router.post('/register', authController.register);
router.get('/logout', middleware.isLogin, authController.logout);
router.get('/', middleware.isLogin, authController.indexAuth);
router.get('/:id/inf',middleware.preventProfile, authController.getInf);
router.get('/:id', middleware.isLogin, middleware.isComplete, authController.index);
router.put('/:id', middleware.isLogin, upload.single('avatar'), authController.completeProfile)
module.exports = router;