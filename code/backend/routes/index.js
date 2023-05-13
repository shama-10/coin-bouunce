const express = require('express');
const authController = require('../controller/authcontroller')
const router = express.Router();

//testing
router.get('/test',(req, res) => res.json({msg : 'Routes are working'}));

//User

//register
router.post('/register', authController.register);
//login
router.post('/login', authController.login);
//


module.exports = router;