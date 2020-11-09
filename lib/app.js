const express = require('express');
const app = express();

app.use(require('cors')());


app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/teams', require('./routes/teams.js'));

module.exports = app;
