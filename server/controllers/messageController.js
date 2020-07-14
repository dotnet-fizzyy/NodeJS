import * as messagesService from '../services/messageService';

export async function getChatMessages(req, res) {
    const messages = await messagesService.getMessageStory(req);

    if (messages && messages.length) {
        return res.status(200).send(messages);
    }

    return res.sendStatus(400);
}

export async function addMessage(message) {
    const messages = await messagesService.addMessage(message);

    return messages;
}

export async function removeMessage(message) {
    const messages = await messagesService.removeMessage(message);

    return messages;
}

