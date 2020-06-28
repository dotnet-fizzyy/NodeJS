import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true,
    },
    comment: {
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
}, {
    versionKey: false,
});

export default model('comments', schema);