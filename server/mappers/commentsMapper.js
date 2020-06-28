import { Comment } from './mapperModels';

export function mapToEntity(req) {
    let commentEntity = new Comment();

    commentEntity.id = req.body.id;
    commentEntity.postId = req.body.postId;
    commentEntity.comment = req.body.comment;
    commentEntity.likes = req.body.likes;

    return commentEntity;
}

export function mapToLikeEntity(req) {
    const commentEntity = new Comment();

    commentEntity.id = req.query.postId;
    commentEntity.userId = req.query.userId;

    return commentEntity;
}