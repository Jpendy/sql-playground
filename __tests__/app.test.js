/* eslint-disable space-before-function-paren */
const { expect, afterEach } = require('@jest/globals');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
// const Team = require('../lib/models/team');

describe('tests routes', () => {
    beforeEach(async () => {
        await client.connect();
        return await client.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    afterEach(() => {
        client.end();
    });

    // eslint-disable-next-line space-before-function-paren
    it('it creates a new team with INSERT', async () => {

        // const team = await Team.create({
        //     name: 'Portland Trail Blazers',
        //     location: 'Portland'
        // });

        const createdTeam = await request(app)
            .post('/api/v1/teams')
            .send({
                id: 1,
                name: 'Portland Trail Blazers',
                location: 'Portland'
            });


        expect(createdTeam).toEqual({
            id: 1,
            name: 'Portland Trail Blazers',
            location: 'Portland'
        });
    });

    expect();
});
