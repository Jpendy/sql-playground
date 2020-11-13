const client = require('../client.js');

module.exports = class Team {

    // #id;
    // #name;
    // #location;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.location = row.location;
    }

    static async create({ name, location }) {
        const { rows } = await client.query(`
            INSERT INTO teams (name, location)
            VALUES ($1, $2)
            RETURNING *
        `, [name, location]);

        return new Team(rows[0]);
    }

    static async FlexibleCreate(row) {

        const rowColumnsArr = Object.keys(row)

        const { rows } = await client.query(`
            INSERT INTO teams (${rowColumnsArr})
            VALUES (${rowColumnsArr.map((_, i) => `$${i + 1}`)})
            RETURNING *
        `, [...Object.values(row)]);

        return new Team(rows[0]);
    }

    static async find() {
        const { rows } = await client.query(`
        SELECT * FROM teams
        `);

        return rows.map(row => new Team(row));
    }

    static async findById(id) {
        const { rows } = await client.query(`
        SELECT * FROM teams 
        WHERE id = $1
        `, [id]);

        if (!rows[0]) return null;
        return new Team(rows[0]);
    }

    static async updateById(id, row) {
        const { rows } = await client.query(`
        UPDATE teams
        SET name=$1, location=$2
        WHERE id=$3
        RETURNING *
        `, [row.name, row.location, id]);

        if (!rows[0]) return null;
        return new Team(rows[0]);
    }

    static async patch(id, rowsObj) {

        const { rows } = await Promise.all(
            Object.keys(rowsObj).map(key => {

                return client.query(`
                UPDATE teams
                SET ${key} = $1
                WHERE id=$2
                RETURNING *
                `, [rowsObj[key], id]);
            })
        ).then(data => data[data.length - 1])

        return new Team(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await client.query(`
        DELETE FROM teams
        WHERE id=$1
        RETURNING *
        `, [id]);

        if (!rows[0]) return null;
        return new Team(rows[0]);
    }
};
