/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
const express = require('express');
const client = require('./client');
const app = express();

app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/teams', async (req, res) => {

    try {
        const data = await client.query(`
            SELECT * FROM teams
        `, []);

        res.json(data.rows);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = app;
