const client = require('../lib/client');

run();

async function run() {

    try {

        await client.connect();

        await client.query(`
            CREATE TABLE teams (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                coach VARCHAR(100) NOT NULL,
                point_guard VARCHAR(100) NOT NULL,
                shooting_guard VARCHAR(100) NOT NULL,
                small_forward VARCHAR(100) NOT NULL,
                power_forward VARCHAR(100) NOT NULL,
                center VARCHAR(100) NOT NULL
            )
        `);


        // eslint-disable-next-line no-console
        console.log('create tables complete');
    }

    catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
    finally {
        client.end();
    }
}
