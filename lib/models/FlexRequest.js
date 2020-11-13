const client = require('../client.js');

module.exports = class FlexRequest {

    static async create(row) {
        const { table } = row
        delete row.table
        const rowColumnsArr = Object.keys(row)

        const { rows } = await client.query(`
            INSERT INTO ${table} (${rowColumnsArr})
            VALUES (${rowColumnsArr.map((_, i) => `$${i + 1}`)})
            RETURNING *
        `, [...Object.values(row)]);

        return rows[0];
    }

    static async find({ table }) {
        const { rows } = await client.query(`
        SELECT * FROM ${table}
        `);

        return rows;
    }

    static async findById(id, { table }) {
        const { rows } = await client.query(`
        SELECT * FROM ${table} 
        WHERE id = $1
        `, [id]);

        if (!rows[0]) return null;
        return rows[0];
    }

    static async updateById(id, row) {
        const { table } = row
        delete row.table
        const rowColumnsArr = Object.keys(row)

        const { rows } = await client.query(`
        UPDATE ${table}
        SET ${rowColumnsArr.map((item, i) => `${item}=$${i + 1}`)}
        WHERE id=$${rowColumnsArr.length + 1}
        RETURNING *
        `, [...Object.values(row), id]);

        if (!rows[0]) return null;
        return rows[0];
    }

    static async patch(id, rowsObj) {

        const { table } = rowsObj
        delete rowsObj.table

        const { rows } = await Promise.all(
            Object.keys(rowsObj).map(key => {

                return client.query(`
                UPDATE ${table}
                SET ${key} = $1
                WHERE id=$2
                RETURNING *
                `, [rowsObj[key], id]);
            })
        ).then(data => data[data.length - 1])

        return rows[0];
    }

    static async delete(id, { table }) {
        const { rows } = await client.query(`
        DELETE FROM ${table}
        WHERE id=$1
        RETURNING *
        `, [id]);

        if (!rows[0]) return null;
        return rows[0];
    }
}




