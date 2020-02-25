import * as userService from '../services/userService';

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
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}