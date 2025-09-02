import React from 'react';
import 'tachyons';

const Footer = () => {
  return (
    <footer className="bg-dark-blue near-white pv4 ph3 tc">
      <div className="mw8 center">
        {/* Branding / Title */}
        <h4 className="f5 fw6 mb3">New Hampshire Crowdfunding</h4>

        {/* Nav Links */}
        <nav className="mb3">
          <a href="/" className="link dim white-70 mh2">Home</a>
          <a href="/create" className="link dim white-70 mh2">Create</a>
          <a href="/profile" className="link dim white-70 mh2">Profile</a>
        </nav>

        {/* Divider */}
        <hr className="o-30 mv3" />

        {/* Copyright */}
        <p className="f6 white-60 mb0">
          &copy; {new Date().getFullYear()} New Hampshire Crowdfunding. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
