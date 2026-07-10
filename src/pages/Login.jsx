import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import img1 from '../assets/image.png';
import eduLogo from '../assets/edu-logo.png';
const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Super Admin Panel');
  const navigate = useNavigate();

  const roles = ['Super Admin Panel', 'Teacher Panel', 'Admin Panel'];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);

    // Logic to redirect based on the selected role
    if (role === 'Super Admin Panel') {
      navigate('/Dashboard2');
    } else if (role === 'Teacher Panel') {
      navigate('/dashboard');
    }
    else if (role === 'Admin Panel') {
      navigate('/Dashboard3');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Redirect based on the current state of selectedRole when clicking "Log in"
    if (selectedRole === 'Super Admin Panel') {
      navigate('/dashboard2');
    } else if(selectedRole === 'Teacher Panel') {
      navigate('/dashboard');
    }else{
      navigate('/dashboard3');
    }
  };

  return (
    <div className="edu-page-container">
      <header className="edu-header">
        <div className="edu-brand">
          {/* <h1 className="logo-text">EDU<span>MANAGER</span></h1>
          <p className="tagline">Smart Learning Starts Here</p> */}
        <img src={eduLogo} alt="Edu Manager Logo" />
        </div>

        <div className="admin-dropdown">
          <button className="dropdown-btn" type="button" onClick={() => setIsOpen(!isOpen)}>
            <span className="user-icon">👤</span>
            {selectedRole}
            <span className={`arrow ${isOpen ? 'up' : ''}`}>⌄</span>
          </button>

          {isOpen && (
            <ul className="dropdown-menu">
              {roles.map((role) => (
                <li 
                  key={role} 
                  onClick={() => handleRoleSelect(role)}
                  className={selectedRole === role ? 'active' : ''}
                >
                  {role}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <main className="edu-main-content">
        <div className="login-column">
          <div className="login-intro">
            <h2>Login your Account</h2>
            <p>Welcome back! Select method to login:</p>
          </div>

          <form className="edu-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Enter your Email" className="edu-input" required />
            <input type="password" placeholder="Enter your Password" className="edu-input" required />
            
            <div className="form-aux">
              <label className="remember-me">
                <input type="checkbox" /> Keep Me Logged In
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <div className="captcha-container">
              <div className="captcha-box">
                <span className="captcha-code">5412345</span>
              </div>
              <input type="text" placeholder="Type the Text" className="edu-input captcha-input" />
            </div>

            <button type="submit" className="login-btn">Log in</button>
          </form>
        </div>

        <div className="illustration-column">
          <img src={img1} alt="Illustration" className="main-illustration" />
        </div>
      </main>
    </div>
  );
};

export default Login;