import express from 'express';
import { config } from 'dotenv';
import { initDbConnection } from './dbSets';
import createMiddleware from './middleware';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

config();
initDbConnection();
createMiddleware(app);

app.listen(PORT, HOST, () => {
    console.log('Server has started');
});

app.get("/health-check", (req, res) => {
   res.send("health");
});
