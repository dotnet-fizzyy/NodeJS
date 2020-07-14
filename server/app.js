import express from 'express';
import { config } from 'dotenv';
import { initDbConnection } from './dbSets';
import socket from 'socket.io';
import http from 'http';
import createMiddleware from './middleware';
import socketHandler from './sockets';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const io = socket(http.createServer(app));

config();
initDbConnection();
createMiddleware(app);

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});

io.listen(5001);
socketHandler(io);
