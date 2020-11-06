const express = require('express');
const client = require('./client.js');
const app = express();


app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



module.exports = app;
