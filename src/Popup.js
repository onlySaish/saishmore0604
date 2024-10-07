import React from 'react';
import './Popup.css'; // Assuming you have a CSS file for styling

const Popup = ({ message, type, onClose }) => {
    return (
        <div className={`popup ${type}`}>
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Popup;
