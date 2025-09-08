const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const table = await knex.schema.hasTable('tasks');

    if (!table) {
      console.log('Setting up DB');
      await knex.migrate.latest();

      console.log('Seeding initial data');
      await knex.seed.run();
    } else {
      console.log('Database exists')
    }

    console.log('Database ready');

    app.listen(port, () => {
      console.log('Server Ready on port: ', port);
    })
  } catch (err) {
    console.error('Database setup failed: ', err);
  }
})();