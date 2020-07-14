import * as postsService from '../services/postsService';

export async function getAllPosts(req, res, next) {
    try {
        let posts = await postsService.getAllPosts().catch(next);
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUserSubscriptionPosts(req, res, next) {
    if (!req.params.id) {
        return res.sendStatus(404);
    }

    const latestPosts = await postsService.getSubscriptionPosts(req.params.id).catch(next);

    return res.send(latestPosts).status(200);
}

export async function getPost(req, res, next) {
    if (!req.params.id) {
        return res.sendStatus(400);
    }

    let post = await postsService.getUserPosts(req.params.id).catch(next);
    if (post) {
        return res.status(200).send(post);
    }

    return res.sendStatus(404);
}

export async function addPost(req, res, next) {
    const userPosts = await postsService.addPost(req).catch(next);

    return res.send(userPosts).status(201);
}

export async function updatePost(req, res, next) {
    const foundPost = await postsService.updatePost(req).catch(next);

    if (foundPost) {
        res.status(200).send(foundPost);
    }

    return res.sendStatus(404);
}

export async function deletePost(req, res, next) {
    if (!req.params.id) {
        return res.sendStatus(400);
    }
    const deletedPost = await postsService.deletePost(req.params.id).catch(next);

    if (deletedPost) {
        return res.status(200).send(deletedPost);
    }

    return res.sendStatus(404);
}

export async function addLike(req, res, next) {
    const updatedPostWithLike = await postsService.addLike(req).catch(next);

    if (updatedPostWithLike) {
        return res.status(200).send(updatedPostWithLike);
    }

    return res.sendStatus(400);
}

export async function removeLike(req, res, next) {
    const removedLike = await postsService.removeLike(req).catch(next);

    if (removedLike) {
        return res.status(200).send(removedLike);
    }

    return res.sendStatus(400);
}