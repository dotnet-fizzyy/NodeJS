import userModel from '../models/userModel';
import * as userMapper from '../mappers/userMapper';
import mongoose from 'mongoose';

const objectIdParser = (id) => mongoose.Types.ObjectId(id)

export async function getAllUsers() {
    return await userModel.find();
}

export async function addSubscription(req) {
    const subscriberId = req.body.subscriberId;
    const authorId = req.body.author;

    if (subscriberId && authorId) {
        const exisitingSubscription = await userModel.find({ _id: objectIdParser(authorId), subscribers: [objectIdParser(subscriberId)] });
        if (exisitingSubscription.length) {
            return null;
        }

        const authorAccount = await userModel.findByIdAndUpdate({
            _id: authorId
        }, {
            $push: { subscribers: subscriberId }
        });

        return authorAccount;
    }

    return null;
}

export async function removeSubscription(req) {
    const subscriberId = req.body.subscriberId;
    const authorId = req.body.author;

    if (subscriberId && authorId) {
        const exisitingSubscription = await userModel.find({ _id: objectIdParser(authorId), subscribers: [objectIdParser(subscriberId)] });
        if (!exisitingSubscription.length) {
            return null;
        }

        const authorAccount = await userModel.findByIdAndUpdate({
            _id: authorId
        }, {
            $pull: { subscribers: subscriberId }
        });

        return authorAccount;
    }

    return null;
}

export async function getUser(id) {
    const user = await userModel.findById(objectIdParser(id));

    return user;
}

export async function addUser(req) {
    const mappedUser = userMapper.mapToModel(req);

    let user = new userModel({
        name: mappedUser.name,
        password: mappedUser.password,
    });
    await user.save();
}

export async function updateUser(req) {
    const mappedUser = userMapper.mapToModel(req);

    const user = await userModel.findByIdAndUpdate({
        _id: mappedUser.id
    }, {
        $set: {
            name: mappedUser.name,
            password: mappedUser.password,
        }
    });

    return user;
}

export async function deleteUser(id) {
    const user = await userModel.findByIdAndRemove(objectIdParser(id));

    return user;
}