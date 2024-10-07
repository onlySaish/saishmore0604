const express = require('express');
const cors = require('cors'); 
const app = express();
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const campaignRoutes = require('./routes/campaignRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Corrected path for user routes
app.use('/user', userRoutes); // Ensure this line starts with a forward slash
app.use('/admin', adminRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/volunteers', volunteerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
