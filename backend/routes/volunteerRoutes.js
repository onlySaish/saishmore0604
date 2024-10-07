const express = require('express');
const router = express.Router();
const { createVolunteer, getVolunteers } = require('../controllers/volunteerController');

// Define the POST route for creating volunteers
router.post('/add', createVolunteer);

// Define the GET route for fetching volunteers
router.get('/show', getVolunteers);

module.exports = router;
