/* eslint-disable space-before-function-paren */
const { expect, afterAll, it, beforeAll } = require('@jest/globals');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const Team = require('../lib/models/team');

describe('tests routes', () => {

    beforeAll(async () => {
        await client.connect();
    });

    beforeEach(async () => {
        await client.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    afterAll(async () => {
        await client.end();
    });

    it('it creates a new team with INSERT', async () => {

        const createdTeam = await request(app)
            .post('/api/v1/teams')
            .send({
                name: 'Dallas Mavericks',
                location: 'Dallas Texas'
            });

        const parsedResponse = JSON.parse(createdTeam.text);

        expect(parsedResponse).toEqual({
            id: '3',
            name: 'Dallas Mavericks',
            location: 'Dallas Texas'
        });
    });

    it('it gets all the teams with SELECT *', async () => {

        const teams = await request(app)
            .get('/api/v1/teams');

        const parsedResponse = JSON.parse(teams.text);

        expect(parsedResponse).toEqual([
            {
                id: expect.anything(),
                name: 'Portland Trail Blazers',
                location: 'Portland, Oregon'
            },
            {
                id: expect.anything(),
                name: 'Denver Nuggets',
                location: 'Denver, Colorado'
            }
        ]);
    });

    it('it gets a single team by id', async () => {

        const team = await Team.create({
            name: 'Toronto Raptors',
            location: 'Toronto, Canada'
        });

        const teamRes = await request(app)
            .get(`/api/v1/teams/${team.id}`);

        const parsedResponse = JSON.parse(teamRes.text);

        expect(parsedResponse).toEqual({
            id: team.id,
            name: 'Toronto Raptors',
            location: 'Toronto, Canada'
        });
    });

    it('it can update a team by id', async () => {

        const team = await Team.create({
            name: 'Toronto Raptors',
            location: 'Toronto, Canada'
        });

        const updatedTeam = await request(app)
            .put(`/api/v1/teams/${team.id}`)
            .send({
                name: 'Toronto Raptors',
                location: 'Toronto, Maple Syrup Land'
            });

        const parsedResponse = JSON.parse(updatedTeam.text);

        expect(parsedResponse).toEqual({
            id: team.id,
            name: 'Toronto Raptors',
            location: 'Toronto, Maple Syrup Land'
        });

    });

    it('it deletes a team by id', async () => {
        const team = await Team.create({
            name: 'Toronto Raptors',
            location: 'Toronto, Canada'
        });

        const deletedTeam = await request(app)
            .delete(`/api/v1/teams/${team.id}`);

        const parsedResponse = JSON.parse(deletedTeam.text);

        expect(parsedResponse).toEqual({
            id: team.id,
            name: 'Toronto Raptors',
            location: 'Toronto, Canada'
        });
    });
});
