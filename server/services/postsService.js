import postsModel from '../models/postsModel';
import * as usersService from '../services/userService';
import * as postsMapper from '../mappers/postsMapper';
import { objectIdParser } from '../helpers';
import userModel from '../models/userModel';

export async function getAllPosts() {
    return await postsModel.find();
}

export async function getUserPosts(id) {
    const posts = await postsModel.find({ userId: objectIdParser(id) });

    return posts;
}

export async function getSubscriptionPosts(id) {
    const user = await usersService.getUser(objectIdParser(id));
    if (!user) {
        return null;
    }

    let latestPosts = [];
    for (let subscriptionId of user.subscriptions) {
        const subscriptionPosts = await postsModel.find({ userId: objectIdParser(subscriptionId) });
        const user = await userModel.findById(objectIdParser(subscriptionId));

        subscriptionPosts = subscriptionPosts.map(post => postsMapper.mapToModel(post, user));
        latestPosts = [...latestPosts, ...subscriptionPosts];
    }

    latestPosts = latestPosts.sort((a, b) => {
        if (a.creationDate > b.creationDate) {
            return 1;
        }

        if (a.creationDate < b.creationDate) {
            return -1;
        }
    });

    return latestPosts;
}

export async function addPost(req) {
    const mappedPost = postsMapper.mapToEntity(req);

    let post = new postsModel({
        userId: mappedPost.userId,
        tweet: mappedPost.tweet,
        creationDate: mappedPost.creationDate,
        likes: mappedPost.likes,
        comments: mappedPost.comments,
    });

    await post.save();

    return await getUserPosts(mappedPost.userId);
}

export async function updatePost(req) {
    const mappedPost = postsMapper.mapToEntity(req);

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
    }, { new: true });

    return post;
}

export async function removeLike(req) {
    const mappedEntity = postsMapper.mapToLikeEntity(req);

    const post = await postsModel.findByIdAndUpdate(objectIdParser(mappedEntity.id), {
        $pull: {
            likes: objectIdParser(mappedEntity.userId)
        }
    }, { new: true });

    return post;
}