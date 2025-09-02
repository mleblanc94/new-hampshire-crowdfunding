import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import 'tachyons';
import './Navigation.css';
import Logo from '../assets/Logo3.png';

const Navigation = () => {
  const location = useLocation();

  const isCurrentPage = (link) => location.pathname === link;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="nav-bar shadow-4">
      <div className="nav-content flex items-center justify-between ph4">
        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="logo-img"
          />
        </Link>

        {/* Links */}
        <ul className="flex list ma0 pa0 items-center">
          <li className="mh3">
            <Link
              to="/"
              className={`nav-link ${isCurrentPage('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>

          {Auth.loggedIn() ? (
            <>
              <li className="mh3">
                <Link
                  to="/create"
                  className={`nav-link ${isCurrentPage('/create') ? 'active' : ''}`}
                >
                  Create
                </Link>
              </li>
              <li className="mh3">
                <Link
                  to="/profile"
                  className={`nav-link ${isCurrentPage('/profile') ? 'active' : ''}`}
                >
                  Profile
                </Link>
              </li>
              <li className="mh3">
                <button
                  className="nav-btn logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="mh2">
                <Link to="/signin">
                  <button className="nav-btn signin-btn">Login</button>
                </Link>
              </li>
              <li className="mh2">
                <Link to="/signup">
                  <button className="nav-btn signup-btn">Signup</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;