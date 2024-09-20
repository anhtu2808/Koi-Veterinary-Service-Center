import React from "react";

function Header() {
  return (
    <>
      {/* <!-- Header Info --> */}
      <div className="header-info text-center">
        <div className="row">
          <div className="col-md-4 align-content-center">
            <img src="../assets/img/logo.png" alt="logo" />
          </div>
          <div className="col-md-8 row justify-content-end">
            <div className="col-md-3">
              <i className="fas fa-phone-alt"></i>
              <div className="text">EMERGENCY</div>
              <div className="contact-info">(237) 681-812-255</div>
            </div>
            <div className="col-md-3">
              <i className="fas fa-clock"></i>
              <div className="text">WORK HOUR</div>
              <div className="contact-info">09:00 - 20:00 Everyday</div>
            </div>
            <div className="col-md-3">
              <i className="fas fa-map-marker-alt"></i>
              <div className="text">LOCATION</div>
              <div className="contact-info">0123 Some Place</div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Navbar --> */}
      <nav className="navbar">
        <div className="container">
          <div className="row col-md-6">
            <div className="col-md-2">
              <a className="nav-link" href="">
                Home
              </a>
            </div>
            <div className="col-md-2">
              <a className="nav-link" href="">
                About us
              </a>
            </div>
            <div className="col-md-2">
              <a className="nav-link" href="">
                Services
              </a>
            </div>
            <div className="col-md-2">
              <a className="nav-link" href="">
                Doctors
              </a>
            </div>
            <div className="col-md-2">
              <a className="nav-link" href="">
                News
              </a>
            </div>
            <div className="col-md-2">
              <a className="nav-link" href="">
                Contact
              </a>
            </div>
          </div>
          <div className="row col-md-6 justify-content-end">
            <div className="col-auto">
              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="col-auto user-icon">
              <a href="" className="nav-link">
                <i className="fas fa-user"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
