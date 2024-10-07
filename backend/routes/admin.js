const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes for admin functionalities
router.post('/create-campaign', adminController.createCampaign);
router.get('/volunteers', adminController.showAllVolunteers);

module.exports = router;
