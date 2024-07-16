
import React from 'react';
import img from '../../assets/img/download.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Dashboard</a>
        <div className="d-flex align-items-center">
          <img src={img} alt="Avatar" className="avatar img-fluid rounded-circle me-4" style={{ width: '25px', height: '25px' }} />
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
