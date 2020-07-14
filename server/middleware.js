import messageRouter from './routes/messagesRoute';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute';
import postsRouter from './routes/postsRoute';
import commentsRouter from './routes/commentsRoute';

export default function createMiddleware(app) {
    app.use(cors({
        origin: '*'
    }));

    app.use(bodyParser.json());

    app.use('/', userRouter);
    app.use('/', postsRouter);
    app.use('/', commentsRouter);
    app.use('/', messageRouter);

    app.use((err, req, res, next) => {
        res.status(500).send(err);
    });
}