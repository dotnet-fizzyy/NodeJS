import { connect, disconnect } from 'mongoose';
import { config } from 'dotenv';
config();

export async function initDbConnection() {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;

    const mongoConnection = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

    return await connect(mongoConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connection has been set successful!')).catch(error => console.error(error));
}

export async function closeConnection() {
    return await disconnect().then(() => console.log('Successfully disconnected!')).catch(error => console.error(error));
}