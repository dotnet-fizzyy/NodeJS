import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute';
import postsRouter from './routes/postsRoute';
import { config } from 'dotenv';
import { initDbConnection } from './dbSets';
import sockets from 'socket.io';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
config();
initDbConnection();
//const io = sockets.listen(PORT);

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', postsRouter);

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});

// io.sockets.on('connection', () => {
//     console.log('sockets work');
// });