const client = require('./client.js')
const FlexRequest = require('./models/FlexRequest.js')
const playersData = require('./playersData.js')


seed()

async function seed() {

    try {

        await client.connect();

        const table = { table: 'players' }

        await Promise.all(
            playersData.map(player => {
                return FlexRequest
                    .create({ ...table, ...player })
            })
        )

        console.log('seed data load complete');

    } catch (e) {
        console.log('Something went wrong', e)
    }
    finally {
        client.end()
    }

}