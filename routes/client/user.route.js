const express = require('express');
const Router = express.Router();
const controller = require("../../controller/client/user.controllers");
const validate = require("../../validate/client/user.validate");
Router.post('/register',validate.register, controller.register);

Router.post('/confirm',validate.confirm, controller.confirm);
  
module.exports = Router;