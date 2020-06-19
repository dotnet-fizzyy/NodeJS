import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    tweet: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
    },
    likes: {
        type: [Types.ObjectId],
        required: true,
    },
    comments: {
        type: [Types.ObjectId],
        required: true,
    }
}, {
    versionKey: false,
});

export default model('posts', schema);