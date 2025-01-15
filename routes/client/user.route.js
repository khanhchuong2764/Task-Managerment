const express = require('express');
const Router = express.Router();
const controller = require("../../controller/client/user.controllers");
const validate = require("../../validate/client/user.validate");
Router.post('/register',validate.register, controller.register);

Router.post('/confirm',validate.confirm, controller.confirm);

Router.post('/login', controller.login);

Router.post('/password/forgot', controller.forgotPassword);

Router.post('/password/otp', controller.otpPassword);

Router.post('/password/reset', controller.resetPassword);
  
module.exports = Router;