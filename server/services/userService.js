import userModel from '../models/userModel';
import * as userMapper from '../mappers/userMapper';
import mongoose from 'mongoose';

export async function getAllUsers() {
    return await userModel.find();
}

export async function getUser(id) {
    const user = await userModel.findById(mongoose.Types.ObjectId(id));

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
    const user = await userModel.findByIdAndRemove(mongoose.Types.ObjectId(id));

    return user;
}