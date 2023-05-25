const express = require('express');
const authController = require('../controller/authcontroller');
const blogController = require('../controller/blogcontroller');
const auth = require('../middlewares/auth');
const commentController = require('../controller/commentController');
const router = express.Router();

//testing
router.get('/test',(req, res) => res.json({msg : 'Routes are working'}));

//User
//register
router.post('/register', authController.register);
//login
router.post('/login', authController.login);
//logout
router.post('/logout', auth, authController.logout);
//refersh
router.get('/refersh', auth, authController.refersh);


//Blog
//Create
router.post('/blog', auth, blogController.create);
//Get All Blogs
router.get('/blog/all', auth, blogController.getAll);
//Get Blog by Id
router.get('/blog/:id', auth, blogController.getById);
//Update Blog
router.put('/blog', auth, blogController.update);
//Delete Blog
router.delete('/blog/:id', auth, blogController.delete);

//comments
//create
router.post('/comment', auth, commentController.create);
//get
router.get('/comment/:id', auth, commentController.getById);


module.exports = router;