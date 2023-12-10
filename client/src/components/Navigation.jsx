import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';
import 'tachyons';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isCurrentPage = (link) => {
    return location.pathname === link;
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav>
      <ul className="flex justify-between list ma0 sans-serif f3 lh-copy bg-navy pv3 links-ul">
        <li>
          <Link to="/" className={`near-white ${isCurrentPage('/') ? 'fw8' : ''}`}>
            Home
          </Link>
        </li>
        {
          Auth.loggedIn() ? (
            <>
              <li>
                <Link to="/create" className={`near-white ${isCurrentPage('/create') ? 'fw8' : ''}`}>
                  Create
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`near-white ${isCurrentPage('/profile') ? 'fw8' : ''}`}>
                  Profile
                </Link>
              </li>
              <li>
                <div>
                  <button className="btn btn-lg btn-light m-2" onClick={logout}>
                    Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <div>
                  <Link to="/signin">
                    <button className="btn btn-lg btn-info m-5 signin-button" to="/signin">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-lg btn-light m-2 signup-button" to="/signup">
                      Signup
                    </button>
                  </Link>
                </div>
              </li>
            </>
          )}

      </ul>
    </nav>
  );
};

export default Navigation;

