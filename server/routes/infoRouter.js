const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
// const auth = require('../middleware/auth.js');
const infoCtrl = require('../controllers/infoCtrl.js');

// We use this technique to link various requests on one route -> Chained Route Handlers
// Passing Middleware auth
router
  .route('/')
  .get(authAdmin, infoCtrl.getInfo)
  .post(auth, infoCtrl.createInfo)

router
  .route('/yourSubmissions')
  .get(auth, infoCtrl.getInfoSingle)
module.exports = router;