const { Router } = require('express');
const Team = require('../models/team');

// eslint-disable-next-line new-cap
module.exports = Router()

    .post('/', (req, res, next) => {
        Team
            .create(req.body)
            .then(team => res.send(team))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Team
            .find()
            .then(team => res.send(team))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Team
            .findById(req.params.id)
            .then(team => res.send(team))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Team
            .updateById(req.params.id, req.body)
            .then(team => res.send(team))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        Team
            .patch(req.params.id, req.body)
            .then(team => res.send(team))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Team
            .deleteById(req.params.id)
            .then(team => res.send(team))
            .catch(next);
    });

