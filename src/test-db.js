const pool = require('../backend/db');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Connected to the database:', res.rows[0]);
    }
    pool.end(); // Close the connection
});
