import express from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/user', userController.getAllUsers);
userRouter.get('/user/:id', userController.getUser);
userRouter.post('/user', userController.addUser);
userRouter.put('/user', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);

export default userRouter;