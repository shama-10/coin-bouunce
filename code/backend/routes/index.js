const express = require('express');
const authController = require('../controller/authcontroller');
const auth = require('../middlewares/auth');
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


module.exports = router;