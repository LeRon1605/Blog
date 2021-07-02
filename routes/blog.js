const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: 'public/upload/blog' });

const middleware = require('../middleware');
const blogController = require('../controllers/blogController');

router.get('/lasted', middleware.isLogin ,middleware.isComplete, blogController.lastedBlog);
router.get('/popular', middleware.isLogin ,middleware.isComplete, blogController.popularBlog);
router.get('/following', middleware.isLogin ,middleware.isComplete, blogController.followingBlog);
router.get('/category', middleware.isLogin ,middleware.isComplete, blogController.categoryIndex);
router.get('/category/:type', middleware.isLogin,middleware.isComplete, blogController.categoryTypeIndex);
router.get('/add', middleware.isLogin,middleware.isComplete, blogController.addIndex);
router.post('/add', middleware.isLogin, middleware.isComplete, upload.single('image'), blogController.add);
router.get('/:id/edit',  middleware.isLogin,middleware.isComplete,middleware.editAuth, blogController.editBlogAccess);
router.put('/:id/edit',  middleware.isLogin,middleware.isComplete, upload.single('image'), blogController.editBlog);
router.delete('/:id/delete', middleware.isLogin,middleware.isComplete, middleware.editAuth, blogController.deleteBlog);
router.get('/:id', middleware.isLogin,middleware.isComplete,  blogController.index);


router.put('/:id', middleware.isLogin,middleware.isComplete,  blogController.addComment);

module.exports = router;