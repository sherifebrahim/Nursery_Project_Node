const { verifyToken } = require('../middleware/verifyToken');
const {login} = require('./../controllers/authController');
const {create} = require('./../controllers/teacherController')
const express = require('express');
const authRouter = express.Router();

authRouter.route('/login')
.post(login);


authRouter.route('/register')
.post(create);

module.exports.authRouter = authRouter;