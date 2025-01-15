const express = require('express');
const Router = express.Router();
const controller = require("../../controller/client/task.controllers");
const validate = require("../../validate/client/task.validate");

Router.get('/', controller.index);
  
Router.get('/detail/:id', controller.detail);

Router.patch('/change-status/:id', controller.changeStatus);

Router.patch('/change-multi', controller.changeMulti);

Router.post('/create',validate.create, controller.create);

Router.patch('/edit/:id',validate.create, controller.edit);

Router.delete('/delete/:id', controller.delete);

module.exports = Router;