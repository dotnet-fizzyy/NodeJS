import * as userService from '../services/userService';
import * as userMapper from '../mappers/userMapper';

export async function getAllUsers(req, res) {
    try {
        let users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUser(req, res) {
    try {
        if (!req.params.id) {
            res.status(400);
        }

        let user = await userService.getUser(req.params.id);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.sendStatus(404);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function addUser(req, res) {
    try {
        const mappedUser = userMapper.mapToModel(req);
        const foundUser = await userService.getUser(mappedUser.id);
        if (foundUser) {
            return status(400).send('Already exists');
        }

        await userService.addUser(req);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateUser(req, res) {
    try {
        const foundUser = await userService.updateUser(req);
        if (foundUser) {
            res.status(200).send(foundUser);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteUser(req, res) {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);

        if (deletedUser) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}