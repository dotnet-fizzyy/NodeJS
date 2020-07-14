import express from 'express';
import * as messageController from '../controllers/messageController';

const postsRouter = express.Router();

postsRouter.get('/history-messages', messageController.getChatMessages);

export default postsRouter;