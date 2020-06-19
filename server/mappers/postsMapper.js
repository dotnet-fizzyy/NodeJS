import { Post } from './mapperModels';

export function mapToModel(req) {
    const post = new Post();

    post.id = req.body.id;
    post.userId = req.body.userId;
    post.tweet = req.body.tweet;

    return post;
}