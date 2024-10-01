import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogoutAPI } from "../../apis";
import { clearUser } from "../../store/userSlice";
import { ROLE } from "../../utils/constants";
import logo from "../../assets/img/logo.png";

function SideBar() {
  const isAuthorized = useSelector((state) => state?.user?.isAuthorized);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <nav
      id="sidebar"
      className="col-md-2 col-lg-2 d-md-block pt-4 bg-light sidebar collapse"
    >
      <div className="position-sticky pt-4">
        <Link to="/">
          <img src={logo} alt="logo" className="img-fluid pb-4" />
        </Link>
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

          {role === ROLE.VETERINARIAN && (
            <li className="nav-item py-2">
              <Link to="/admin/allappointment" className="nav-link">
                <i className="far fa-calendar-alt"></i> All Appointment For Vet
              </Link>
            </li>
          )}

          {role === ROLE.STAFF && (
            <li className="nav-item py-2">
              <Link to="/admin/allappointment" className="nav-link">
                <i className="fas fa-sitemap"></i> All Appointment For Staff
              </Link>
            </li>
          )}

          <li className="nav-item py-2">
            <Link className="nav-link" href="#">
              <i className="far fa-images"></i> Photos
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
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary mt-5 w-50"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
