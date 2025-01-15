const express = require('express');
const Router = express.Router();
const controller = require("../../controller/client/user.controllers");

Router.post('/register', controller.register);

Router.post('/confirm', controller.confirm);
  
module.exports = Router;