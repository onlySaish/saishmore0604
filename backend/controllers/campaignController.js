// controllers/campaignController.js

const pool = require('../db'); // Assuming your DB setup is here

// Create a new campaign
const createCampaign = async (req, res) => {
    const { title, amount, description } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        // await pool.query(
        //     'INSERT INTO campaigns (title, amount, description) VALUES ($1, $2, $3)',
        //     [title, amount, description]
        // );
        await client.query(
            'INSERT INTO campaigns (title, amount, description) VALUES ($1, $2, $3)',
            [title, amount, description]
        );

        // Retrieve all campaigns after insertion
        // const campaigns = await pool.query('SELECT * FROM campaigns');
        const campaigns = await client.query('SELECT * FROM campaigns');
        await client.query('COMMIT');

        // Send all campaigns back as the response
        res.json(campaigns.rows);
        // Insert the new campaign into the database
        
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).send('Server Error');
    } finally {
        // Release the client back to the pool
        client.release();
    }
};

const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await pool.query('SELECT * FROM campaigns'); // Fetch all campaigns from the database
        res.json(campaigns.rows); // Send the campaigns as the response
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const donateToCampaign = async (req, res) => {
    const { id, amount_received } = req.body;
    try {
      // Update the amount_received for the specified campaign
      const result = await pool.query(
        'UPDATE campaigns SET amount_received = amount_received + $1 WHERE id = $2 RETURNING *',
        [amount_received, id]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Donation updated successfully', campaign: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Campaign not found' });
      }
    } catch (error) {
      console.error('Error updating donation:', error);
      res.status(500).json({ error: 'Failed to update donation' });
    }
  };
  
// Export the controller functions
module.exports = {
    createCampaign, 
    getAllCampaigns,
    donateToCampaign,
};
