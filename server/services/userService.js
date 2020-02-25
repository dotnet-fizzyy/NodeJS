import userModel from '../models/userModel';
import * as userMapper from '../mappers/userMapper';

export async function getAllUsers() {
    return await userModel.find();
}

export async function getUser(id) {
    const user = await userModel.findById(id);

    return user;
}

export async function addUser(req) {
    const mappedUser = userMapper.mapToModel(req);

    let user = new userModel({
        name: mappedUser.name,
        age: mappedUser.age,
        position: mappedUser.position,
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
            age: mappedUser.age,
            position: mappedUser.position,
        }
    });

    return user;
}

export async function deleteUser(id) {
    const user = await userModel.findByIdAndRemove(id);

    return user;
}