import express from 'express';
import * as commentsController from '../controllers/commentsController';

const postsRouter = express.Router();

postsRouter.get('/comments/:id', commentsController.getAllUserComments);
postsRouter.get('/comments/post/:id', commentsController.getPostComments);
postsRouter.post('/comments', commentsController.addComment);
postsRouter.put('/comments', commentsController.updateComment);
postsRouter.delete('/comments', commentsController.deleteComment);
postsRouter.put('/comments-like', commentsController.addLike);
postsRouter.delete('/comments-like', commentsController.removeLike);

export default postsRouter;