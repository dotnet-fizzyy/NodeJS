import express from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.get('/user/:id', userController.getUser);
userRouter.get('/user/name/:name', userController.getUsersByRegex);
userRouter.post('/user', userController.addUser);
userRouter.post('/verify-user', userController.authentificateUser);
userRouter.put('/user', userController.updateUser);
userRouter.delete('/user/:id', userController.deleteUser);
userRouter.post('/subscribe', userController.addSubscription);
userRouter.delete('/unsubscribe', userController.removeSubscription);
userRouter.post('/subs', userController.getSubscribers);

export default userRouter;