import postsModel from '../models/postsModel';
import * as usersService from '../services/userService';
import * as postsMapper from '../mappers/postsMapper';
import { objectIdParser } from '../helpers';

export async function getAllPosts() {
    return await postsModel.find();
}

export async function getUserPosts(id) {
    const posts = await postsModel.findById(objectIdParser(id));

    return posts;
}

export async function getSubscriptionPosts(id) {
    const user = await usersService.getUser({ userId: objectIdParser(id) })
    if (!user) {
        return null;
    }

    const latestPosts = [];
    for (const subscriptionId in user.subscriptions) {
        const subscriptionPosts = await postsService.find({ userId: objectIdParser(subscriptionId) });
        latestPosts = [...latestPosts, subscriptionPosts];
    }

    latestPosts = Array.from(latestPosts).sort((a, b) => {
        if (a.creationDate > b.creationDate) {
            return 1;
        }

        if (a.creationDate < b.creationDate) {
            return -1;
        }
    });

    return userPosts;
}

export async function addPost(req) {
    const mappedPost = postsMapper.mapToModel(req);

    let post = new postsModel({
        userId: mappedPost.userId,
        tweet: mappedPost.tweet,
        creationDate: mappedPost.creationDate,
        likes: mappedPost.likes,
        comments: mappedPost.comments,
    });

    await post.save();
}

export async function updatePost(req) {
    const mappedPost = postsMapper.mapToModel(req);

    const user = await postsModel.findByIdAndUpdate({
        _id: mappedPost.id
    }, {
        $set: {
            tweet: mappedPost.tweet
        }
    });

    return user;
}

export async function deletePost(id) {
    const post = await postsModel.findByIdAndRemove(objectIdParser(id));

    return post;
}

export async function addLike(req) {
    const mappedEntity = postsMapper.mapToLikeEntity(req);

    const post = await postsModel.findByIdAndUpdate(objectIdParser(mappedEntity.id), {
        $push: {
            likes: objectIdParser(mappedEntity.userId)
        }
    });

    return post;
}

export async function removeLike(req) {
    const mappedEntity = postsMapper.mapToLikeEntity(req);

    const post = await postsModel.findByIdAndUpdate(objectIdParser(mappedEntity.id), {
        $pull: {
            likes: objectIdParser(mappedEntity.userId)
        }
    });

    return post;
}