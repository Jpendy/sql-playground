const request = require('superagent')

seed()

async function seed() {

    await request.post('https://sql-pendy-playground.herokuapp.com/api/v1/players')
        .send({
            name: 'TJ McCollum',
            position: 'Shooting Guard',
            number: 3,
            team_id: 1,
        })

}