const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const postRoute = require('./routes/post');
const getRoute = require('./routes/get');
const patchRoute = require('./routes/patch');
const deleteRoute = require('./routes/delete');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const pathcUserRoute = require('./routes/patchUser');
const cors = require('cors');
const app = express();

//MIDDLEWARES
app.use(cors())
app.use(bodyParser.json())
app.use('/post', postRoute);
app.use('/get', getRoute);
app.use('/patch', patchRoute);
app.use('/delete', deleteRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/makeAdmin', pathcUserRoute);

//ROUTES
app.get('/', (req,res) => {
    res.send('We are on home');
});


//CONNECT DB
mongoose.connect(
    process.env.connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
);

//LISTEN
app.listen(3000);

