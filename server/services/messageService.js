import messageModel from '../models/messageModel';
import { mapToModel, mapToEntity } from '../mappers/messageMapper';
import mongoose from 'mongoose';
import { objectIdParser } from '../helpers';

export async function getMessageStory(req) {
    const authorId = req.query.authorId;
    const recipientId = req.query.recipientId;

    if (authorId && recipientId) {
        const firstSessionId = await messageModel.findOne({ recepientId: objectIdParser(recipientId), authorId: objectIdParser(authorId) });
        const secondSessionId = await messageModel.findOne({ recepientId: objectIdParser(authorId), authorId: objectIdParser(recipientId) });

        if ((firstSessionId && firstSessionId._id) || (secondSessionId && secondSessionId._id)) {
            const sessionId = firstSessionId && firstSessionId._id ? firstSessionId.sessionId : secondSessionId.sessionId;

            const messages = await messageModel.find({ sessionId: sessionId });

            return messages;
        }

        return null;
    }

    return null;
}

export async function addMessage(message) {
    const mappedMessage = mapToModel(message);

    if (!mappedMessage.sessionId) {
        mappedMessage.sessionId = new mongoose.Types.ObjectId().toHexString();
    }

    const messageEntity = mapToEntity(mappedMessage);
    await messageEntity.save();

    const chatMessages = await messageModel.find({ sessionId: mappedMessage.sessionId });

    return chatMessages;
}

export async function removeMessage(message) {
    const mappedMessage = mapToModel(message);

    const existingSession = await messageModel.exists({ sessionId: mappedMessage.sessionId });
    if (!existingSession) {
        return null;
    }

    const messageEntity = await messageModel.findByIdAndDelete(objectIdParser(mappedMessage.id));
    if (messageEntity) {
        const chatMessages = await messageModel.find({ sessionId: mappedMessage.sessionId });

        return chatMessages;
    }

    return null;
}