import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import logo from './nuqi-gold-icon.png';

function WelcomePage() {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <img src={logo} alt="Logo" className="blox-logo" />
        <h2>Welcome back, Shremohan</h2>
        <p>Here's what you've missed out since you last logged in</p>
        <div className="card">
          Blox surged to new historic highs early in the first full week of March, surpassing AED2115/oz in spot prices.
        </div>
        <div className="card">
          The rally in blox prices was largely attributed to investor speculation regarding the Fed's monetary policy stance.
        </div>
        <div className="card">
          Blox prices steadily climbed throughout the week, reaching and surpassing AED2160/oz by Thursday's trading.
        </div>
        <div className="swipe-to-dashboard" onClick={navigateToDashboard}>
          <img src={logo} alt="Swipe Icon" className="swipe-icon" />
          <span>Click here to access dashboard</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
