import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/loginRoute';
import { config } from 'dotenv';
import { initDbConnection } from './dbSets';
import { signToken, verifyToken } from './services/tokenService';

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

app.get('/', (req, res) => {
    res.send('Server works');
})

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});