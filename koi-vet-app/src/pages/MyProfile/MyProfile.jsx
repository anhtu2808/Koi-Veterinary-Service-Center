// src/pages/MyInfo/MyProfile.js
import React, { useEffect } from "react";
import "./MyProfile.css"; // Import file CSS
import { fetchMyInfoAPI } from "../../apis";

const MyProfile = () => {

  useEffect(()=>{
    const fetchMyInfo = async () => {
      const response = await fetchMyInfoAPI();
      console.log(response);
    }
    fetchMyInfo();
  })
  return (
    <div className="container my-profile-container">
      <div className="card shadow my-profile-card">
        <div className="card-header my-profile-card-header">
          <h3>My Information</h3>
        </div>
        <div className="card-body">
          {/* Row 1: Avatar và thông tin chung */}
          <div className="row">
            <div className="col-md-4 my-profile-avatar-container">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="img-fluid my-profile-avatar"
              />
            </div>
            <div className="col-md-8">
              <h4>John Doe</h4>
              <p className="text-muted">john.doe@example.com</p>
              <p className="text-muted">+84 123 456 789</p>
            </div>
          </div>

          {/* Row 2: Thông tin chi tiết */}
          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Full Name:</h5>
              <p>John Doe</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Username:</h5>
              <p>john_doe</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Email:</h5>
              <p>john.doe@example.com</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Phone:</h5>
              <p>+84 123 456 789</p>
            </div>
            <div className="col-md-12">
              <h5 className="my-profile-title">Address:</h5>
              <p>123 Main St, Thu Duc City, Ho Chi Minh City</p>
            </div>
          </div>
        </div>
        <div className="card-footer text-center my-profile-card-footer">
          <button className="my-profile-edit-btn">Edit Information</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
