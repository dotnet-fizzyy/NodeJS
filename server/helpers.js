import mongoose from 'mongoose';

export function objectIdParser(id) {
    return mongoose.Types.ObjectId(id);
}