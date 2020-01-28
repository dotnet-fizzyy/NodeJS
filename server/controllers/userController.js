import userModel from '../models/userModel';

export async function getAllUsers(req, res) {
    try {
        let users = await userModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUser(req, res) {
    try {
        let user = await userModel.findOne({
            name: req.params.name
        });

        if (user !== null) res.status(200).send(user);
        else res.sendStatus(404);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function addUser(req, res) {
    try {
        let user = new userModel({
            name: req.body.name,
            age: req.body.age,
        });

        await user.save();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateUser(req, res) {
    try {
        await userModel.update({
            name: req.body.name
        }, {
            $set: {
                name: req.body.name,
                age: req.body.age,
            }
        });
        res.status(200).send('updated!');
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteUser(req, res) {
    try {
        let deletedUser = await userModel.deleteOne({
            name: req.params.name
        });

        if (deletedUser.deletedCount !== 0) res.status(200).send('deleted!');
        else res.sendStatus(404);
    } catch (error) {
        res.status(500).send(error);
    }
}