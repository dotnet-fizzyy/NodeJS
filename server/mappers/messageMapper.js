import { Message } from "./mapperModels";
import messageModel from '../models/messageModel';

export function mapToModel(message) {
    const messageModel = new Message();

    messageModel.id = messageModel._id;
    messageModel.authorId = message.authorId;
    messageModel.sessionId = message.sessionId;
    messageModel.recepientId = message.recepientId;
    messageModel.message = message.message;

    return messageModel;
}

export function mapToEntity(message) {
    const messageEntity = new messageModel({
        authorId: message.authorId,
        recepientId: message.recepientId,
        sessionId: message.sessionId,
        message: message.message,
        creationDate: message.creationDate,
    });

    return messageEntity;
}