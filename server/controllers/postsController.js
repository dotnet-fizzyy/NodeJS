import * as postsService from '../services/postsService';

export async function getAllPosts(req, res) {
    try {
        let posts = await postsService.getAllPosts();
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUserSubscriptionPosts(req, res) {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getPost(req, res) {
    try {
        if (!req.params.id) {
            res.status(400);
        }

        let post = await postsService.getPost(req.params.id);
        if (post) {
            res.status(200).send(post);
        }
        else {
            res.sendStatus(404);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function addPost(req, res) {
    try {
        const foundPost = await postsService.getPost(req.body.id);
        if (foundPost) {
            return status(400).send('Already exists');
        }

        await postsService.addPost(req);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updatePost(req, res) {
    try {
        const foundPost = await postsService.updatePost(req);
        if (foundPost) {
            res.status(200).send(foundPost);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deletePost(req, res) {
    try {
        const deletedPost = await postsService.deletePost(req.params.id);

        if (deletedPost) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}