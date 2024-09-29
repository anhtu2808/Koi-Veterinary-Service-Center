// src/pages/MyInfo/MyProfile.js
import React, { useEffect, useState } from "react";
import "./MyProfile.css"; // Import file CSS
import { useSelector } from "react-redux";

const MyProfile = () => {

  const myInfo = useSelector(state => state?.user)
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
              <h4>{myInfo.fullName}</h4>
              <p className="text-muted">{myInfo.email}</p>
              <p className="text-muted">+84 123 456 789</p>
            </div>
          </div>

          {/* Row 2: Thông tin chi tiết */}
          <div className="row mt-4">
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Full Name:</h5>
              <p>{myInfo.fullName}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Username:</h5>
              <p>john_doe</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Email</h5>
              <p>{myInfo.email}</p>
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="my-profile-title">Phone:</h5>
              <p>{myInfo.phone}</p>
            </div>
            <div className="col-md-12">
              <h5 className="my-profile-title">Address:</h5>
              <p>{myInfo.address}</p>
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
