const request = require('superagent')

    (async () => {

        await request.post('https://sql-pendy-playground.herokuapp.com/api/v1/players')
            .send({
                name: 'Damian Lillard',
                position: 'Point Guard',
                number: 0,
                team: 1,
            })

    })()