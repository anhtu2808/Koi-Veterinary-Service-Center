import React from "react";
import logo from "../../assets/img/logo.png";
import "../../pages/Home/Home.css"
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      {/* <!-- Header Info --> */}
      <div className="header-info text-center">
        <div className="row">
          <div className="col-md-4 align-content-center">
            <Link to="/"><img src={logo} alt="logo" /></Link>
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
          <div className="row col-md-7">
            <div className="col-md-2 text-center">
            <Link to="/" className="nav-link">Home</Link>
            </div>
            <div className="col-md-2 text-center">
            <Link to="/" className="nav-link">About us</Link>
            </div>
            <div className="col-md-2 text-center">
            <Link to="/" className="nav-link">Services</Link>
            </div>
            <div className="col-md-2 text-center">
            <Link to="/veterinarians" className="nav-link">Veterinarians</Link>
            </div>
            <div className="col-md-2 text-center">
            <Link to="/" className="nav-link">News</Link>
            </div>
            <div className="col-md-2 text-center">
            <Link to="/" className="nav-link">Contacts</Link>
            </div>
          </div>
          <div className="row col-md-5 justify-content-end">
            <div className="col-auto">
              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="col-auto user-icon">
            <Link to="/" className="nav-link"><i className="fas fa-user"></i></Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
