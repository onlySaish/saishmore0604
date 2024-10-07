const express = require('express');
const router = express.Router();
const { createCampaign, getAllCampaigns, donateToCampaign } = require('../controllers/campaignController'); // Ensure both functions are imported

// Define the POST route for creating campaigns
router.post('/add', createCampaign);

// Define the GET route for fetching all campaigns
router.get('/show', getAllCampaigns); // Ensure this line is correct

router.post('/donate', donateToCampaign);

// Export the router
module.exports = router;
