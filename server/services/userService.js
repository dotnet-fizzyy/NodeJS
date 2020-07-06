import userModel from '../models/userModel';
import * as userMapper from '../mappers/userMapper';
import { objectIdParser } from '../helpers';

export async function getAllUsers() {
    return await userModel.find();
}

export async function getUsersByRegex(name) {
    const users = await userModel.find({ name: { $regex: name } });

    return users;
}

export async function addSubscription(req) {
    const subscriberId = req.body.subscriberId;
    const authorId = req.body.authorId;

    if (subscriberId && authorId) {
        const exisitingSubscription = await userModel.find({ _id: objectIdParser(authorId), subscribers: [objectIdParser(subscriberId)] });
        if (exisitingSubscription.length) {
            return null;
        }

        const authorAccount = await userModel.findByIdAndUpdate({
            _id: objectIdParser(authorId)
        }, {
            $push: { subscribers: objectIdParser(subscriberId) }
        });

        const userAccount = await userModel.findByIdAndUpdate({
            _id: objectIdParser(subscriberId)
        }, {
            $push: { subscriptions: objectIdParser(authorId) }
        });

        return authorAccount;
    }

    return null;
}

export async function removeSubscription(req) {
    const subscriberId = req.query.subscriberId;
    const authorId = req.query.authorId;

    if (subscriberId && authorId) {
        const exisitingSubscription = await userModel.findOne(objectIdParser(authorId), { subscribers: [objectIdParser(subscriberId)] });

        if (!exisitingSubscription) {
            return null;
        }

        const authorAccount = await userModel.findByIdAndUpdate({
            _id: objectIdParser(authorId)
        }, {
            $pull: { subscribers: objectIdParser(subscriberId) }
        });

        const userAccount = await userModel.findByIdAndUpdate({
            _id: objectIdParser(subscriberId)
        }, {
            $pull: { subscriptions: objectIdParser(authorId) }
        });

        return authorAccount;
    }

    return null;
}

export async function getUser(id) {
    const user = await userModel.findById(objectIdParser(id));

    return user;
}

export async function authentificateUser(req) {
    const mappedUser = userMapper.mapToEntity(req);
    const foundUser = await userModel.findOne({ name: mappedUser.name, password: mappedUser.password });

    return foundUser;
}

export async function addUser(req) {
    const mappedUser = userMapper.mapToEntity(req);

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