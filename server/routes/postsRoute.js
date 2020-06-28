import express from 'express';
import * as postsController from '../controllers/postsController';

const postsRouter = express.Router();

postsRouter.get('/posts', postsController.getAllPosts);
postsRouter.get('/post/:id', postsController.getPost);
postsRouter.get('/user-posts/:id', postsController.getUserSubscriptionPosts);
postsRouter.post('/post', postsController.addPost);
postsRouter.put('/post', postsController.updatePost);
postsRouter.delete('/post/:id', postsController.deletePost);
postsRouter.put('/post-like', postsController.addLike);
postsRouter.delete('/post-like', postsController.removeLike);

export default postsRouter;