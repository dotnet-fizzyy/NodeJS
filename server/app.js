import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute';
import postsRouter from './routes/postsRoute';
import commentsRouter from './routes/commentsRoute';
import { config } from 'dotenv';
import { initDbConnection } from './dbSets';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
config();
initDbConnection();

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', postsRouter);
app.use('/', commentsRouter);
app.use((err, req, res, next) => {
    res.status(500).send(err);
});

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});