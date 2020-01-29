import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loginRouter from './routes/loginRoute';
import { config } from 'dotenv';
import { initDbConnection } from './dbSets';

config();
initDbConnection();
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use('/', loginRouter);

app.get('/', (req, res) => {
    res.send('Server works');
})

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});