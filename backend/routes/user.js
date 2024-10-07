const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for user functionalities
router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.get('/campaigns', userController.viewCampaigns);

module.exports = router;
