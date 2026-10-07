import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import img1 from '../assets/image.png';
import eduLogo from '../assets/edu-logo.png';

 const API_URL = 'http://localhost:5000/api/auth/login';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const roles = [
    {
      label: 'Super Admin Panel',
      value: 'SuperAdmin'
    },
    {
      label: 'Teacher Panel',
      value: 'Teacher'
    },
    {
      label: 'Admin Panel',
      value: 'Admin'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
    setError('');

    // Clear previous credentials when switching panels
    setUserId('');
    setPassword('');
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  setError('');

  if (!selectedRole) {
    setError('Please select a panel before login');
    return;
  }

  setLoading(true);

  try {
    const loginPayload = {
      userId: userId.trim(),
      password,
      role: selectedRole.value
    };

    console.log('LOGIN REQUEST:', {
      userId: loginPayload.userId,
      role: loginPayload.role
    });

    const response = await fetch(
      API_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(loginPayload)
      }
    );

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(
        json.message || 'Login failed'
      );
    }

    const loginData = json.data || {};

    const token =
      loginData.token ||
      loginData.accessToken ||
      json.accessToken;

    const loggedInRole =
      loginData.role ||
      loginData.user?.role ||
      json.user?.role ||
      json.user?.userType;

    const loggedInUserId =
      loginData.userId ||
      loginData.user?.userId ||
      json.user?.userId ||
      userId.trim();

    localStorage.setItem(
      'authToken',
      token
    );

    localStorage.setItem(
      'userRole',
      loggedInRole
    );

    localStorage.setItem(
      'userId',
      loggedInUserId
    );

    if (loggedInRole === 'SuperAdmin') {
      navigate('/dashboard2');
    } else if (loggedInRole === 'Teacher') {
      navigate('/dashboard');
    } else if (loggedInRole === 'Admin') {
      navigate('/dashboard3');
    }

  } catch (err) {
    console.error('Login error:', err);

    setError(
      err.message ||
      'Something went wrong while logging in'
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="edu-page-container">

      <header className="edu-header">

        <div className="edu-brand">
          <img
            src={eduLogo}
            alt="Edu Manager Logo"
          />
        </div>

        <div className="admin-dropdown">

          <button
            className="dropdown-btn"
            type="button"
            onClick={() =>
              setIsOpen(
                !isOpen
              )
            }
          >
            <span className="user-icon">
              👤
            </span>

            {selectedRole ? selectedRole.label : 'Select Panel'}

            <span
              className={`arrow ${
                isOpen
                  ? 'up'
                  : ''
              }`}
            >
              ⌄
            </span>
          </button>

          {isOpen && (
            <ul className="dropdown-menu">

              {roles.map((role) => (

                <li
                  key={role.value}

                  onClick={() =>
                    handleRoleSelect(
                      role
                    )
                  }

                  className={
  selectedRole?.value === role.value
    ? 'active'
    : ''
}
                >
                  {role.label}
                </li>

              ))}

            </ul>
          )}

        </div>

      </header>

      <main className="edu-main-content">

        <div className="login-column">

          <div className="login-intro">

            <h2>
              Login your Account
            </h2>

            <p>
              Welcome back! Select method to login:
            </p>

          </div>

          <form
            className="edu-form"
            onSubmit={handleLogin}
          >

            <input
              type="text"
              placeholder="Enter your User ID"
              className="edu-input"
              value={userId}
              onChange={(e) =>
                setUserId(
                  e.target.value
                )
              }
              required
            />

            <input
              type="password"
              placeholder="Enter your Password"
              className="edu-input"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            {error && (
              <p
                style={{
                  color: 'red',
                  margin:
                    '0 0 10px 0'
                }}
              >
                {error}
              </p>
            )}

            <div className="form-aux">

              <label className="remember-me">

                <input
                  type="checkbox"
                />

                Keep Me Logged In

              </label>

              <a
                href="#"
                className="forgot-link"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                Forgot Password?
              </a>

            </div>

            <div className="captcha-container">

              <div className="captcha-box">

                <span className="captcha-code">
                  5412345
                </span>

              </div>

              <input
                type="text"
                placeholder="Type the Text"
                className="edu-input captcha-input"
              />

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading
                ? 'Logging in...'
                : 'Log in'}
            </button>

          </form>

        </div>

        <div className="illustration-column">

          <img
            src={img1}
            alt="Illustration"
            className="main-illustration"
          />

        </div>

      </main>

    </div>
  );
};

export default Login;