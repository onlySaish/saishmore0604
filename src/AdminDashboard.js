import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCampaignForm, setShowCampaignForm] = useState(false); 
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/'); // Redirect to the login page
    };
    const [campaignData, setCampaignData] = useState({
        title: '',
        amount: '',
        description: ''
      });
    
      const [volunteerData, setVolunteerData] = useState({
        name: '',
        email: '',
        campaign_id: '',
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCampaignData({
          ...campaignData,
          [name]: value
        });
      };

      const fetchCampaigns = async () => {
        try {
            const response = await axios.get('http://localhost:5000/campaigns/show'); // Fetch all campaigns
            setCampaigns(response.data); // Set the campaigns in state
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    const fetchVolunteers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/volunteers/show');
          setVolunteers(response.data);
        } catch (error) {
          console.error('Error fetching volunteers:', error);
        }
      };

    const handleVolunteerInputChange = (e) => {
        const { name, value } = e.target;
        setVolunteerData({
          ...volunteerData,
          [name]: value,
        });
      };

    const handleVolunteerSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/volunteers/add', volunteerData);
          if (response.status === 200) {
            alert('Volunteer added successfully!');
            setVolunteerData({
              name: '',
              email: '',
              campaign_id: '',
            });
            setShowVolunteerForm(false);
            fetchVolunteers(); // Refresh the volunteer list
          } else {
            alert('Failed to add volunteer.');
          }
        } catch (error) {
          console.error('Error adding volunteer:', error);
          alert('Error adding volunteer.');
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/campaigns/add', campaignData);
            console.log(response);
      
            if (response.status === 200) {
              alert('Campaign created successfully!');
              // Clear the form or handle the success in any way you like
              setCampaignData({
                title: '',
                amount: '',
                description: ''
              });
              setShowCampaignForm(false); // Hide form after submission
              fetchCampaigns();
            } else {
              alert('Failed to create campaign.');
            }
          } catch (error) {
            console.error('Error:', error.response.data || error.message);
            alert('Error creating campaign.');
          }
        };

        useEffect(() => {
            fetchCampaigns();
            fetchVolunteers(); 
        }, []);


        const renderVolunteers = () => {
            return (
              <div>
                <div className="volunteer-header">
                  <h2>Volunteers</h2>
                  <button onClick={() => setShowVolunteerForm(!showVolunteerForm)}>
                    {showVolunteerForm ? 'Hide Volunteer Form' : 'Add Volunteer'}
                  </button>
                </div>
                {showVolunteerForm && (
                  <form className="volunteer-form" onSubmit={handleVolunteerSubmit}>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={volunteerData.name}
                        onChange={handleVolunteerInputChange}
                        placeholder="Enter volunteer name"
                        required
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={volunteerData.email}
                        onChange={handleVolunteerInputChange}
                        placeholder="Enter volunteer email"
                        required
                      />
                    </label>
                    <label>
                      Campaign ID:
                      <input
                        type="number"
                        name="campaign_id"
                        value={volunteerData.campaign_id}
                        onChange={handleVolunteerInputChange}
                        placeholder="Enter campaign ID"
                        required
                      />
                    </label>
                    <button type="submit">Submit</button>
                  </form>
                )}
                <table className='volunteer-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Campaign ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer) => (
                      <tr key={volunteer.id}>
                        <td>{volunteer.id}</td>
                        <td>{volunteer.name}</td>
                        <td>{volunteer.email}</td>
                        <td>{volunteer.campaign_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          };

  const renderContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return <div>
            <div className="campaign-header">
                <h2>Campaigns</h2>
                <button onClick={() => setShowCampaignForm(!showCampaignForm)}>
                  {showCampaignForm ? 'Hide Campaign Form' : 'Create New Campaign'}
                </button>
            </div>
            {showCampaignForm && (
              <form className="campaign-form" onSubmit={handleSubmit}>
                <label>
                  Campaign Name:
                  <input type="text" 
                    name="title" 
                    value={campaignData.title} 
                    onChange={handleInputChange} 
                    placeholder="Enter campaign name" 
                    required  />
                </label>
                <label>
                Amount Required:
                <input type="number" 
                    name="amount" 
                    value={campaignData.amount} 
                    onChange={handleInputChange} 
                    placeholder="Enter required amount" 
                    required />
              </label>
                <label>
                  Description:
                  <textarea name="description" 
                    value={campaignData.description} 
                    onChange={handleInputChange} 
                    placeholder="Enter campaign details"  />
                </label>
                <button type="submit">Submit</button>
              </form>
            )}
            <table className="campaign-table">
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Amount Required</th>
                                    <th>Amount Received</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.id}>
                                        <td>{campaign.title}</td>
                                        <td>{campaign.amount}</td>
                                        <td>{campaign.amount_received}</td>
                                        <td>{campaign.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
        </div>;

      case 'volunteers':
        return renderVolunteers();
      case 'logout':
        return <div>You have logged out.</div>;
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>DRAUPADI SANGATHAN</h1>
      </header>

      {/* Main content area */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <div className="sidebar">
          <button 
            className={`sidebar-btn ${activeTab === 'campaigns' ? 'active' : ''}`} 
            onClick={() => setActiveTab('campaigns')}>
            Campaigns
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'volunteers' ? 'active' : ''}`} 
            onClick={() => setActiveTab('volunteers')}>
            Volunteers
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'logout' ? 'active' : ''}`} 
            onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Content area */}
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
