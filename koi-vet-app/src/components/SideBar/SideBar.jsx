import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchLogoutAPI } from "../../apis";
import logo_admin from "../../assets/img/admin_logo.png";
import { clearUser } from "../../store/userSlice";
import { ROLE } from "../../utils/constants";
import "./SideBar.css";

function SideBar() {
  const isAuthorized = useSelector((state) => state?.user?.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = useSelector((state) => state.user.role);

  const handleLogout = async () => {
    const response = await fetchLogoutAPI();
    localStorage.removeItem("accessToken");
    if (response.status === 200) {
      dispatch(clearUser());
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav id="sidebar" className="col-md-2 col-lg-2 d-md-block sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          <img src={logo_admin} alt="logo" className="img-fluid" />
        </Link>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/usermanagement" className={`nav-link ${location.pathname === '/admin/usermanagement' ? 'active' : ''}`}>
            <i className="fas fa-users"></i> Users
          </Link>
        </li>
        {(role === ROLE.VETERINARIAN || role === ROLE.STAFF) && (
          <li className="nav-item">
            <Link to="/admin/appointment" className={`nav-link ${location.pathname === '/admin/appointment' ? 'active' : ''}`}>
              <i className="far fa-calendar-alt"></i> All Appointments
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="/admin/servicemanagement" className={`nav-link ${location.pathname === '/admin/servicemanagement' ? 'active' : ''}`}>
            <i className="fas fa-cogs"></ i> Services Management
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/schedule" className="nav-link">
            <i className="fas fa-calendar-alt"></i> Veterinarian Schedule
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="far fa-question-circle"></i> Help
          </Link>
        </li>
        <li className="nav-item">
          <Link to="#" className="nav-link">
            <i className="fas fa-cog"></i> Setting
          </Link>
        </li>
      </ul>
      {isAuthorized && (
        <div className="sidebar-logout">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default SideBar;
