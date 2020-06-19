import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscribers: {
        type: [Types.ObjectId]
    },
    subscriptions: {
        type: [Types.ObjectId]
    },
}, {
    versionKey: false,
});

export default model('user', schema);