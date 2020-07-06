import commentsModel from '../models/commentsModel';
import postsModel from '../models/postsModel';
import * as commentsMapper from '../mappers/commentsMapper';
import { objectIdParser } from '../helpers';

export async function getAllUserComments(userId) {
    return await commentsModel.find({ userId: objectIdParser(userId) });
}

export async function getPostComments(postId) {
    const post = await postsModel.findById(objectIdParser(postId));
    if (!post._id) {
        return null;
    }

    let comments = [];
    for (let commentId of post.comments) {
        const comment = await commentsModel.findById(objectIdParser(commentId));
        comments = [...comments, comment];
    }

    return comments;
}

export async function addComment(req) {
    const mappedComment = commentsMapper.mapToEntity(req);

    let comment = new commentsModel({
        userId: mappedComment.userId,
        comment: mappedComment.comment,
        creationDate: mappedComment.creationDate,
        likes: mappedComment.likes
    });

    await comment.save();

    const updatedPostWithComment = await postsModel.updateOne({
        _id: mappedComment.postId
    }, {
        $push: { comments: comment._id }
    });

    return updatedPostWithComment;
}

export async function updateComment(req) {
    const mappedComment = commentsMapper.mapToEntity(req);

    const comment = await commentsModel.findByIdAndUpdate({
        _id: objectIdParser(mappedComment.id)
    }, {
        $set: {
            comment: mappedComment.comment
        }
    });

    return comment;
}

export async function deleteComment(postId, commentId) {
    const commentInPost = await postsModel.findOneAndUpdate({
        _id: postId
    }, {
        $pull: { comments: objectIdParser(commentId) }
    });

    if (!commentInPost) {
        return null;
    }

    const comment = await commentsModel.findByIdAndRemove(objectIdParser(commentId));

    return comment;
}

export async function addLike(req) {
    const mappedEntity = commentsMapper.mapToLikeEntity(req);

    const comment = await commentsModel.findByIdAndUpdate(objectIdParser(mappedEntity.id), {
        $push: {
            likes: objectIdParser(mappedEntity.userId)
        }
    }, { new: true });

    return comment;
}

export async function removeLike(req) {
    const mappedEntity = commentsMapper.mapToLikeEntity(req);

    const comment = await commentsModel.findByIdAndUpdate(objectIdParser(mappedEntity.id), {
        $pull: {
            likes: objectIdParser(mappedEntity.userId)
        }
    }, { new: true });

    return comment;
}