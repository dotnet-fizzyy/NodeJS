import * as userService from '../services/userService';

export async function getAllUsers(req, res, next) {
    let users = await userService.getAllUsers().catch(next);

    res.status(200).send(users);
}

export async function getUsersByRegex(req, res, next) {
    const users = await userService.getUsersByRegex(req.params.name).catch(next);

    return res.status(200).send(users);
}

export async function getUser(req, res, next) {
    if (!req.params.id) {
        return res.status(400);
    }

    let user = await userService.getUser(req.params.id).catch(next);
    if (user) {
        res.status(200).send(user);
    }
    else {
        res.sendStatus(404);
    }
}

export async function getSubscribers(req, res, next) {
    const subscriberIds = await userService.getAllUsers();
    let subs = [];

    for (let subscriber of subscriberIds) {

        if (subscriber) {
            subs = [...subs, { id: subscriber._id, name: subscriber.name }];
        }
    }

    return res.status(200).send(subs);
}

export async function authentificateUser(req, res, next) {
    const user = await userService.authentificateUser(req).catch(next);
    if (user) {
        return res.status(200).send(user);
    }

    return res.sendStatus(400);
}

export async function addUser(req, res, next) {
    await userService.addUser(req).catch(next);
    res.sendStatus(200);
}

export async function updateUser(req, res, next) {
    const foundUser = await userService.updateUser(req).catch(next);
    if (foundUser) {
        res.status(200).send(foundUser);
    } else {
        res.sendStatus(404);
    }
}

export async function deleteUser(req, res, next) {
    if (!req.params.id) {
        return res.status(400);
    }

    const deletedUser = await userService.deleteUser(req.params.id).catch(next);

    if (deletedUser) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
}

export async function addSubscription(req, res, next) {
    const addedSubscription = await userService.addSubscription(req).catch(next);
    if (addedSubscription) {
        res.status(201).send(addedSubscription);
    } else {
        res.sendStatus(400);
    }
}

export async function removeSubscription(req, res, next) {
    const removedSubscription = await userService.removeSubscription(req).catch(next);
    if (removedSubscription) {
        res.status(200).send(removedSubscription);
    } else {
        res.sendStatus(400);
    }
}