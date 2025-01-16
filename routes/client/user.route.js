const express = require('express');
const Router = express.Router();
const controller = require("../../controller/client/user.controllers");
const validate = require("../../validate/client/user.validate");
const authMiddleware = require("../../middleware/client/auth.middleware");
Router.post('/register',validate.register, controller.register);

Router.post('/confirm',validate.confirm, controller.confirm);

Router.post('/login',validate.login, controller.login);

Router.post('/password/forgot',validate.forgot, controller.forgotPassword);

Router.post('/password/otp',validate.otp,controller.otpPassword);

Router.post('/password/reset',validate.reset, controller.resetPassword);

Router.get('/profile', authMiddleware.requestAuth, controller.profile);
  
module.exports = Router;