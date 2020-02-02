import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loginRouter from './routes/loginRoute';
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

app.use('/', loginRouter);

app.get('/', (req, res) => {
    res.send('Server works');
})

//Token test signature and validation
app.post('/get_token', (req, res) => {
    const token = signToken({ name: req.body.name, age: req.body.age });
    res.send({ token: token });
})

app.post('/verify_token', (req, res) => {
    const isTokenValid = verifyToken(req.body.token);
    if (isTokenValid) res.sendStatus(200);
    else res.sendStatus(401);
})

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});