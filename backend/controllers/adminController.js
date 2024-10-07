const pool = require('../../backend/db');

// Create a new campaign
exports.createCampaign = async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query('INSERT INTO campaigns (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating campaign' });
    }
};

// Show all volunteers
exports.showAllVolunteers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM volunteers');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching volunteers' });
    }
};
