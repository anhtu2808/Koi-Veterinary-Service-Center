import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogoutAPI } from "../../apis";
import { clearUser } from "../../store/userSlice";

function SideBar() {
  const isAuthorized = useSelector((state) => state?.user?.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetchLogoutAPI();
    localStorage.removeItem("accessToken");
    if (response.status === 200) {
      dispatch(clearUser());
      navigate("/");
    }
  };

  const handleButtonLogin = () => {
    navigate("/login");
  };
  return (
    <nav
      id="sidebar"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-1">
        <ul className="nav flex-column">
          <li className="nav-item py-2">
            <Link className="nav-link active" href="#">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link to="/admin/usermanagement" className="nav-link">
              <i className="fas fa-users"></i> Users
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link to="/admin/allappointment" className="nav-link">
              <i className="far fa-calendar-alt"></i> All Appointment For Vet
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link" href="#">
              <i className="far fa-images"></i> Photos
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link">
              <i className="fas fa-sitemap"></i> All Appointment For Staff
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link" href="#">
              <i className="far fa-envelope"></i> Message
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link" href="#">
              <i className="far fa-question-circle"></i> Help
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link" href="#">
              <i className="fas fa-cog"></i> Setting
            </Link>
          </li>
          {isAuthorized && (
            <button className="btn btn-primary" onClick={() => handleLogout()}>
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
