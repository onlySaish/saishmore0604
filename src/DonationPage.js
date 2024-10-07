import React, { useState } from 'react';
import axios from 'axios';
import './DonationPage.css'
import boxImage from './donate-img.png'

const DonationPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [donationAmounts, setDonationAmounts] = useState({});

  const fetchCampaigns = async () => {
    try {
        const response = await axios.get('http://localhost:5000/campaigns/show'); // Fetch all campaigns
        setShowCampaigns(true);
        setCampaigns(response.data); // Set the campaigns in state
    } catch (error) {
        console.error('Error fetching campaigns:', error);
    }
};

const handleDonationInputChange = (campaignId, value) => {
    setDonationAmounts({
      ...donationAmounts,
      [campaignId]: value
    });
  };

  // Handle donation submission
  const handleDonate = async (campaignId) => {
    const amountToDonate = donationAmounts[campaignId];
    if (amountToDonate && amountToDonate > 0) {
      try {
        const response = await axios.post('http://localhost:5000/campaigns/donate', {
          id: campaignId,
          amount_received: amountToDonate
        });
        console.log(response);

        if (response.status === 200) {
          alert(`Successfully donated $${amountToDonate} to campaign ${campaignId}`);
          fetchCampaigns(); // Refresh campaigns to update amount received
        }
      } catch (error) {
        console.error('Error during donation:', error);
        alert('Donation failed. Please try again.');
      }
    } else {
      alert('Please enter a valid donation amount.');
    }
  };

  return (
    <div className="donation-page">
      {/* NGO Name */}
      <h1 className="ngo-heading">DRAUPADI SANGATHAN</h1>

      {/* NGO Description */}
      <p className="ngo-description">
        We at Draupadi Sangathan strive to improve the quality of life for underprivileged communities through various programs and campaigns.
      </p>

      {/* Donation Button with Box Image */}
      <button className="donation-button" onClick={fetchCampaigns}>
        <img src={boxImage} alt="Donation Box" className="box-image" />
        DONATION BOX 
      </button>

      {/* Campaigns Tab */}
      {showCampaigns && (
        <div className="campaigns-tab">
          <h2>Ongoing Campaigns</h2>
          <div className="campaigns-container">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <div className="campaign-card" key={campaign.id}>
                  <h3>{campaign.title}</h3>
                  <p>Amount Required: ${campaign.amount}</p>
                  <p>Amount Received: ${campaign.amount_received}</p>
                  <label htmlFor={`donate-${campaign.id}`}>Enter Amount to Donate:</label>
                  <input
                    type="number"
                    id={`donate-${campaign.id}`}
                    placeholder="Enter amount"
                    min="1"
                    onChange={(e) => handleDonationInputChange(campaign.id, e.target.value)} // Update state on change
                  />
                  <p>{campaign.description}</p>
                  <button onClick={() => handleDonate(campaign.id)}>DONATE</button>
                </div>
              ))
            ) : (
              <p>No campaigns available at the moment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;
