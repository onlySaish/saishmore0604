import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
// import { text } from 'body-parser';
import { useNavigate, useLocation } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify'; // Import toast functions
// import 'react-toastify/dist/ReactToastify.css';
// import Router from './AppRouter';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Popup from './Popup';
import Dashboard from './AdminDashboard'; // Ensure you have this component created
import Donation from './DonationPage'; 

function App() {   

    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const location = useLocation();

    // Function to handle sign in
    // const handleEmail = (e) =>{
    //     setEmail({...email,[e.target.email]: e.target.value})
    // }
    // const handlePass = (e) =>{
    //     setPassword({...password,[e.target.password]: e.target.value})
    // }
    // const handleName = (e) =>{
    //     setName({...text,[e.target.text]: e.target.value})
    // }
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/login', { email, password });
            console.log("Response:", response.data);
            // const userRole = response.data.userRole;

            const redirectPath = response.data.redirect;

            // Redirect based on userRole
            // if (userRole == 'admin') {
            //     // history.push('/dashboard'); // Redirect to Dashboard for admin
            //     console.log("Navigating to admin dashboard");
            //     navigate('/dashboard');
            // } else {
            //     // history.push('/donation'); // Redirect to Donation page for user
            //     console.log("Navigating to donation page");
            //     navigate('/donation');
            // }
            if (redirectPath) {
                console.log(`Navigating to ${redirectPath}`); // Debugging line
                navigate(redirectPath); // Redirect to the specified path
            }

            // toast.success('Login successful!');
            setPopupMessage(response.data.message || 'Login successful!');
            setPopupType('success');
        } catch (err) {
            // setError('Invalid email or password');
            // toast.error('Invalid email or password');
            // setError('Invalid email or password');
            setPopupMessage(err.response?.data?.error || 'Invalid email or password');
            setPopupType('error');
            console.error(err);
        }
    };
    

    // Function to handle sign up
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/signup', { name, email, password });
            // console.log(response.data);
            setPopupMessage('Sign up successful!');
            setPopupType('success'); // Set type to success
            // Handle successful sign up (e.g., redirect or show a success message)
        } catch (err) {
            // setError('Error signing up, please try again');
            setPopupMessage(err.response?.data?.error || 'Error signing up, please try again');
            setPopupType('error');
            console.error(err);
        }
    };

    return (
        <>
            {popupMessage && (
                <Popup
                    message={popupMessage}
                    type={popupType}
                    onClose={() => {
                        setPopupMessage('');
                        setPopupType('');
                    }}
                />
            )}
            <div className="container">
                {error && <div className="error-message">{error}</div>}
                {/* Conditional rendering for forms */}
                {location.pathname === '/' && (
                    <div className={`form-container sign-in-container ${isSignIn ? 'active' : ''}`}>
                        <form onSubmit={handleSignIn}>
                            <h1>Sign In</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                )}
                {location.pathname === '/' && (
                    <div className={`form-container sign-up-container ${!isSignIn ? 'active' : ''}`}>
                        <form onSubmit={handleSignUp}>
                            <h1 id="create">Create Account</h1>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                )}

                {/* Render the Dashboard and Donation pages based on the current path */}
                {location.pathname === '/dashboard' && <Dashboard />}
                {location.pathname === '/donation' && <Donation />}
            </div>
        </>
    );
}

export default App;
