import { connect, disconnect } from 'mongoose';
import { config } from 'dotenv';
config();

export async function initDbConnection() {
    return await connect(process.env.MONGODB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connection has been set successful!')).catch(error => console.error(error));
}

export async function closeConnection() {
    return await disconnect();
}