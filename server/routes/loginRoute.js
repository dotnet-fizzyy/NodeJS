import express from 'express';
import * as userController from '../controllers/userController';

const loginRouter = express.Router();

loginRouter.get('/users', userController.getAllUsers);
loginRouter.get('/user/:name', userController.getUser);
loginRouter.post('/user', userController.addUser);
loginRouter.put('/user', userController.updateUser);
loginRouter.delete('/user/:name', userController.deleteUser);

export default loginRouter;