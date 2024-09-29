import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import "../../pages/Home/Home.css";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Sử dụng NavLink để kiểm soát trạng thái "active"
import { useDispatch, useSelector } from "react-redux";
import { fetchLogoutAPI } from "../../apis";
import { clearUser } from "../../store/userSlice";
import { ROLE } from "../../utils/constants";

function Header() {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await fetchLogoutAPI();
    localStorage.removeItem("accessToken");
    dispatch(clearUser());
    navigate("/login");
    
  };

  const handleButtonLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Header Info */}
      <div className="header-info text-center py-3 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className=" text-start col-md-4">
              <Link to="/">
                <img src={logo} alt="logo" className="img-fluid" />
              </Link>
            </div>
            <div className="col-md-8 row justify-content-end">
              <div className="col-md-3 text-center">
                <i className="fas fa-phone-alt"></i>
                <div className="text">EMERGENCY</div>
                <div className="contact-info">(237) 681-812-255</div>
              </div>
              <div className="col-md-3 text-center">
                <i className="fas fa-clock"></i>
                <div className="text">WORK HOUR</div>
                <div className="contact-info">09:00 - 20:00 Everyday</div>
              </div>
              <div className="col-md-3 text-center">
                <i className="fas fa-map-marker-alt"></i>
                <div className="text">LOCATION</div>
                <div className="contact-info">0123 Some Place</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Menu Links */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/veterinarians" className="nav-link">
                  Veterinarians
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/news" className="nav-link">
                  News
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacts" className="nav-link">
                  Contacts
                </NavLink>
              </li>
            </ul>
            {/* User Actions */}
            <div className="d-flex">
              {isAuthorized ? (
                <button
                  className="btn btn-outline-light me-2"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-outline-light me-2"
                  type="button"
                  onClick={() => handleButtonLogin()}
                >
                  Login
                </button>
              )}
              {user.role === ROLE.CUSTOMER &&
              <Link to="/profile" className="btn btn-outline-light">
              <i className="fas fa-user"></i>
            </Link>}
            {user.role === ROLE.VETERINARIAN &&
            <Link to="/admin" className="btn btn-outline-light">
            <i className="fas fa-user"></i>
            </Link>}
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
