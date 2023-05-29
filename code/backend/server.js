const express = require('express');
const dbConnect = require('./database/index');
const {PORT} = require('./config/index');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const coreOptions = {
    credentials: true,
    origin: ['http://localhost:3000']
}

const app = express();

app.use(cookieParser());

app.use(cors(coreOptions));

app.use(express.json());

app.use(router);

dbConnect();

app.use('/storage',express.static('storage'));

app.use(errorHandler);


app.listen(PORT, console.log(`Backend is runnung on PORT: ${PORT} `));