const express = require('express');
require('dotenv').config()

const cors = require('cors');

const dbConnect = require('./database/config');
const app = express();

app.use( cors() );

dbConnect()

app.listen( process.env.PORT, () => {
    console.log(`It's alive on port ${process.env.PORT}`);
})
