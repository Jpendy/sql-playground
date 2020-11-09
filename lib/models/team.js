const client = require('../client.js');

module.exports = class Team {

    id;
    name;
    location;

    constructor(row) {

        this.id = row.id;
        this.name = row.name;
        this.location = row.location;
    }

    static async create({ id, name, location }) {
        const { rows } = await client.query(`
            INSERT INTO teams 
            VALUES ($1, $2, $3)
            RETURNING *
        `, [id, name, location]);

        return new Team(rows[0]);
    }
};
