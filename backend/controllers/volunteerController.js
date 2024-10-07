const pool = require('../db'); // Assuming your DB setup is here

// Create a new volunteer
const createVolunteer = async (req, res) => {
    const { name, email, campaign_id } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // await pool.query(
        //     'INSERT INTO volunteers (name, email, campaign_id) VALUES ($1, $2, $3)',
        //     [name, email, campaign_id]
        // );
        await client.query(
            'INSERT INTO volunteers (name, email, campaign_id) VALUES ($1, $2, $3)',
            [name, email, campaign_id]
        );
        await client.query('COMMIT');
        res.status(200).send('Volunteer added successfully.');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).send('Server Error');
    } finally {
        // Release the client back to the pool
        client.release();
    }
};

// Fetch all volunteers
const getVolunteers = async (req, res) => {
    try {
        const volunteers = await pool.query('SELECT * FROM volunteers');
        res.json(volunteers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    createVolunteer,
    getVolunteers,
};
