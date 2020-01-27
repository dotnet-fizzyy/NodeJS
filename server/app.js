const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

const loginRouter = require('./routes/loginRoute');

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