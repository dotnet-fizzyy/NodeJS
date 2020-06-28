import * as commentsService from '../services/commentsService';
import commentsModel from '../models/commentsModel';

export async function getAllUserComments(req, res) {
    if (!req.params.id) {
        res.sendStatus(400);
    }

    try {
        let comments = await commentsService.getAllUserComments(req.params.id);
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getPostComments(req, res) {
    if (!req.params.id) {
        res.sendStatus(400);
    }

    try {
        const comments = await commentsService.getPostComments(req.params.id);
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function addComment(req, res) {
    try {
        await commentsService.addComment(req)
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateComment(req, res) {
    try {
        const foundComment = await commentsService.updateComment(req);
        if (foundComment) {
            res.status(200).send(foundComment);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteComment(req, res) {
    const postId = req.query.postId;
    const commentId = req.query.commentId;

    if (!postId || !commentId) {
        return res.sendStatus(400);
    }

    try {
        const deletedComment = await commentsService.deleteComment(postId, commentId);

        if (deletedComment) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function addLike(req, res) {
    try {
        const commentWithLike = await commentsService.addLike(req);
        if (commentWithLike) {
            return res.sendStatus(200);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function removeLike(req, res) {
    try {
        const commentWithLike = await commentsService.removeLike(req);
        if (commentWithLike) {
            return res.sendStatus(200);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}