import * as commentsService from '../services/commentsService';

export async function getAllUserComments(req, res, next) {
    if (!req.params.id) {
        res.sendStatus(400);
    }

    let comments = await commentsService.getAllUserComments(req.params.id).catch(next);

    return res.send(comments);
}

export async function getPostComments(req, res, next) {
    if (!req.params.id) {
        res.sendStatus(400);
    }

    const comments = await commentsService.getPostComments(req.params.id).catch(next);

    return res.status(200).send(comments);
}

export async function addComment(req, res) {
    const postWithComment = await commentsService.addComment(req);

    return res.status(200).send(postWithComment);
}

export async function updateComment(req, res) {
    const foundComment = await commentsService.updateComment(req);

    if (foundComment) {
        res.status(200).send(foundComment);
    }

    return res.sendStatus(404);
}

export async function deleteComment(req, res) {
    const postId = req.query.postId;
    const commentId = req.query.commentId;

    if (!postId || !commentId) {
        return res.sendStatus(400);
    }

    const deletedComment = await commentsService.deleteComment(postId, commentId);

    if (deletedComment) {
        return res.sendStatus(200);
    }

    return res.sendStatus(404);
}

export async function addLike(req, res) {
    const commentWithLike = await commentsService.addLike(req);

    if (commentWithLike) {
        return res.status(200).send(commentWithLike);
    }

    return res.sendStatus(400);
}

export async function removeLike(req, res) {
    const commentWithLike = await commentsService.removeLike(req);

    if (commentWithLike) {
        return res.status(200).send(commentWithLike);
    }

    return res.sendStatus(400);
}