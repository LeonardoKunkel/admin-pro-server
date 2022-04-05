const express = require('express');

const cors = require('cors');

const dbConnect = require('./database/config');
const app = express();

require('dotenv').config()

dbConnect()

app.use( cors() );

app.use(express.json({extended: true}))

app.use('/api/users', require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));

app.listen( process.env.PORT, () => console.log(`It's alive on port ${process.env.PORT}`))
