import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import loginRouter from './routes/loginRoute';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use('/', loginRouter);

app.get('/', (req, res) => {
    res.send('Server works');
})

app.listen(PORT, () => {
    console.log('Server has started');
});