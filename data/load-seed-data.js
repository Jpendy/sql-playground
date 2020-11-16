/* eslint-disable indent */
const client = require('../lib/client');
const teams = require('./teams.js');


// eslint-disable-next-line space-before-function-paren
(async () => {
    try {
        await client.connect();

        await Promise.all(
            teams.map(item => {
                return client.query(`
                    INSERT INTO teams (name, coach, point_guard, shooting_guard, small_forward, power_forward, center)
                    VALUES($1, $2, $3, $4, $5, $6, $7)
                `,
                    [item.name, item.coach, item.point_guard, item.shooting_guard, item.small_forward, item.power_forward, item.center]);
            })
        );
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
    finally {
        client.end();
    }

})();
