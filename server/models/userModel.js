const { Schema, model, connect } = require('mongoose');

connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    position: {
        type: String,
        default: 'student',
    }
}, {
    versionKey: false,
});

module.exports = model('user', schema);