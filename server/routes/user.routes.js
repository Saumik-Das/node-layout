const express = require('express');
const userCtrl = require('../controllers/user.contoller');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(authCtrl.requireSignIn, userCtrl.read)
    .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID);

module.exports = router;

