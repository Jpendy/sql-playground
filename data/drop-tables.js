const client = require('../lib/client');



// eslint-disable-next-line space-before-function-paren
(async () => {

    try {
        await client.connect();

        await client.query(`
            DROP TABLE IF EXISTS teams CASCADE;
        `);

        // eslint-disable-next-line no-console
        console.log(' drop tables complete');
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
    finally {
        client.end();
    }

})();
