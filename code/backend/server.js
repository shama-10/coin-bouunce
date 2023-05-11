const express = require('express');
const dbConnect = require('./database/index');

const app = express();

const PORT = 5000;

dbConnect();

app.get('/',(req,res) => res.json({msg:'Hello World 1234'}));

app.listen(PORT, console.log(`Backend is runnung on PORT: ${PORT} `));