import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import OTPVerification from './OTPVerification';
import WelcomePage from './WelcomePage';
import logo from './nuqi-gold-icon.png';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="login-container">
            <div className="login-box">
              <img src={logo} alt="Blox Logo" className="blox-logo" />
              <h1>LOGIN / SIGNUP</h1>
              <div className="phone-input">
                <select>
                  <option value="+91">+91</option>
                  {/* Add more country codes if needed */}
                </select>
                <input type="text" placeholder="Enter your number" />
              </div>
              <div className="checkbox-group">
              </div>
              <p>Unable to receive SMS? 
                {/* Using button instead of anchor tag for accessibility */}
                <button 
                  className="link-button" 
                  onClick={() => alert('OTP sent to email')}
                >
                  Send OTP on Email
                </button>
              </p>

              {/* <h4>Or continue with</h4> */}

              <div className="login-options">
                <button className="login-button google">
                  <i className="fab fa-google"></i>
                </button>
                <button className="login-button apple">
                  <i className="fab fa-apple"></i>
                </button>
                <button className="login-button password">
                  <i className="fas fa-key"></i>
                </button>
              </div>
              <a href="/otp" className="send-otp">Send OTP</a>
            </div>
          </div>
        } />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
