import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
import AdminDashboard from './AdminDashboard';
import DonationPage from './DonationPage';

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} /> */}
                <Route path="/dashboard" element={<AdminDashboard />} />  {/* Admin Dashboard Route */}
                <Route path="/donation" element={<DonationPage />} />      {/* Donation Page Route */}
                
            </Routes>
        </Router>
    );
}

export default AppRouter;
