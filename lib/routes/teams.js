const { Router } = require('express');
const Team = require('../models/team');

// eslint-disable-next-line new-cap
module.exports = Router()

    .post('/', (req, res, next) => {
        Team
            .create(req.body)
            .then(team => res.send(team))
            .catch(next);
    });
