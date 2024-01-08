'use strict';

const express = require('express');
const app = express();
app.use(express.json())
const port =  process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());
app.use('/', require('./routes/comment')());

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);

module.exports = server;