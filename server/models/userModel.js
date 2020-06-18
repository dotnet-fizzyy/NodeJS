import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});

export default model('user', schema);