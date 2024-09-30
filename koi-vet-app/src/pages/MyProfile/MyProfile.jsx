import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMyInfoAPI } from "../../apis";
import { updateUserInfo } from "../../store/userSlice"; // Assuming you have this action in your userSlice
import "./MyProfile.css";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const dispatch = useDispatch();
  const myInfo = useSelector(state => state?.user);
  const customer = useSelector(state => state?.user?.customer);
  const navigate = useNavigate();
  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({
      fullName: myInfo.fullName,
      email: myInfo.email,
      phone: customer.phone,
      address: customer.address,
    });
  };
  const handleAllAppointment = () => {
    navigate("/allappointment");
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      const updatedInfo = await updateMyInfoAPI(editedInfo);
    
      dispatch(updateUserInfo(updatedInfo));
    
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleChange = (e) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-header  my-profile-card-header text-white">
          <h3 className="mb-0 my-profile-card-header">My Information</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              <h4>{myInfo.fullName}</h4>
              <p className="text-muted">{myInfo.email}</p>
            </div>
            <div className="col-md-8">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={editedInfo.fullName}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{myInfo.fullName}</p>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={editedInfo.email}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{myInfo.email}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={editedInfo.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{customer.phone}</p>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={editedInfo.address}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{customer.address}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="card-footer text-center d-flex justify-content-between">
          {isEditing ? (
            <button className="btn btn-primary" onClick={() => handleSave()}>Save Changes</button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleEdit()}>Edit Information</button>
          )}
           <button className="btn btn-primary" onClick={() => handleAllAppointment()}>My Appointments</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
