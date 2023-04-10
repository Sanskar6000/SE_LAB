// Router is like a mini-app
// Create Router as a module, define some routes & mount the router module on a path in the main app
//In the main app app.use('/birds', birds) App will able to handle requests to /birds, /birds/about, etc
const express = require('express');
const router = express.Router();
// Import Controller
const userCtrl = require('../controllers/userCtrl.js');
const auth = require('../middleware/auth.js');

// Import Controller
//const userController = require('../controllers/userController.js');

//Register a User(POST request)
router.post('/register', userCtrl.registerUser);

//Login a User(POST request)
router.post('/login', userCtrl.loginUser);

//Login admin
router.post('/admin', userCtrl.adminUser)

// verify Token
router.get('/verify', userCtrl.verifiedToken);
router.get('/verifyAdmin', userCtrl.verifiedTokenAdmin);

module.exports = router;