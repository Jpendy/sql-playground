const { Router } = require('express');
const FlexRequest = require('../models/FlexRequest.js')

const table = { table: 'players' }

module.exports = Router()
    .post('/', (req, res, next) => {
        FlexRequest
            .create({ ...table, ...req.body })
            .then(team => res.send(team))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        FlexRequest
            .find(table)
            .then(team => res.send(team))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        FlexRequest
            .findById(req.params.id, table)
            .then(team => res.send(team))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        FlexRequest
            .updateById(req.params.id, { ...table, ...req.body })
            .then(team => res.send(team))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        FlexRequest
            .delete(req.params.id, table)
            .then(team => res.send(team))
            .catch(next);
    });

