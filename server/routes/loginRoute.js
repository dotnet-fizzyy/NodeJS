const express = require('express');
const loginRouter = express.Router();
const userController = require('../controllers/userController');

loginRouter.get('/users', userController.getAllUsers);
loginRouter.get('/user/:name', userController.getUser);
loginRouter.post('/user', userController.addUser);
loginRouter.put('/user', userController.updateUser);
loginRouter.delete('/user/:name', userController.deleteUser);

module.exports = loginRouter;