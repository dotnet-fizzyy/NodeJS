import { Post } from './mapperModels';

export function mapToEntity(req) {
    const post = new Post();

    post.id = req.body.id;
    post.userId = req.body.userId;
    post.tweet = req.body.tweet;

    return post;
}

export function mapToLikeEntity(req) {
    const post = new Post();

    post.id = req.query.postId;
    post.userId = req.query.userId;

    return post;
}