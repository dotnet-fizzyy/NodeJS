import postsModel from '../models/postsModel';
import * as postsMapper from '../mappers/postsMapper';
import mongoose from 'mongoose';

const objectIdParser = (id) => mongoose.Types.ObjectId(id)

export async function getAllPosts() {
    return await postsModel.find();
}

export async function getUserPosts(id) {
    const posts = await postsModel.findById(mongoose.Types.ObjectId(id));

    return posts;
}

export async function getSubscriptionPost(id) {
    const userPosts = await postsModel.find({ userId: objectIdParser(id) })

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
    const post = await postsModel.findByIdAndRemove(mongoose.Types.ObjectId(id));

    return post;
}