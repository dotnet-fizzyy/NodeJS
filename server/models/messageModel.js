import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
    authorId: {
        type: Types.ObjectId,
        required: true,
    },
    recepientId: {
        type: Types.ObjectId,
        required: true,
    },
    sessionId: {
        type: Types.ObjectId,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
    },
}, {
    versionKey: false,
});

export default model('messages', schema);