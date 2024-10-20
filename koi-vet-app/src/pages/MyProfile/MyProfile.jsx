import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyInfoAPI, updateCustomerAPI } from "../../apis";
import { fetchUserProfile, setCustomer, setUser, setVeterinarian, updateUserInfo } from "../../store/userSlice"; // Assuming you have this action in your userSlice
import "./MyProfile.css";
import default_profile from "../../assets/img/profile_default.png"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Preloader from "../../components/Preloader/Preloader";
const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const myInfo = useSelector(state => state?.user);
  const customer = useSelector(state => state?.user?.customer);
  const navigate = useNavigate();
  const handleUploadImage = (event) => {
    setImage(event.target.files[0]);
  }
  const handleEdit = () => { 
    setEditedInfo(
      {
        "userId": myInfo?.user_id,
        "fullName": myInfo?.fullName,
        "email": myInfo?.email,
        "phoneNumber": customer?.phone,
        "address": customer?.address,
        "image": myInfo?.image
      }
    );
    setIsEditing(true);
  };
  const handleAllAppointment = () => {
    navigate("/profile/appointment");
  };
  const handleMyPond = () => {
    navigate("/profile/pond");
  };
  const handleMyKoi = () => {
    navigate("/profile/koi");
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      setIsLoading(true);
      const response = await updateCustomerAPI(editedInfo,image);
      if(response.status === 200){
        const fetchMyInfo = async () => {
          const response = await fetchMyInfoAPI();
          setIsLoading(false);
          console.log(response);
          if (response.status === 200) {
            dispatch(setUser(response.data))
            dispatch(setCustomer(response.data.customer))
            dispatch(setVeterinarian(response.data.veterinarian))
          }
        }
        fetchMyInfo();
       
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleChange = (e) => {
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });
  };

  if(isLoading){
    return <Preloader />
  }
  return (
    <div className="container my-profile-container my-5">
      <div className="card shadow ">
        <div className="card-header  my-profile-card-header text-white">
          <h3 className="mb-0  my-profile-card-header">My Information</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
           
              <img
                src={image ? URL.createObjectURL(image) : myInfo?.image || default_profile}
                alt="User Avatar"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
               {(isEditing) && ( // Only show the upload input if isEditing is true
              <div className="form-group mt-3 text-center">
                <label className="custom-file-upload">
                  <input
                    type="file"
                    onChange={handleUploadImage}
                    disabled={!isEditing} // cho phép upload khi trong chế độ create hoặc edit
                  />
                  Upload Image <i className="fa-solid fa-image"></i>
                </label>
              </div>
            )}
              {/* <h4>{myInfo.fullName}</h4>
              <p className="text-muted">{myInfo.email}</p> */}
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
                    <label htmlFor="phoneNumber" className="form-label">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={editedInfo.phoneNumber}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="form-control-plaintext">{customer?.phone}</p>
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
          
          <button className="btn btn-primary" onClick={() => handleMyPond()}>My Pond</button>
          <button className="btn btn-primary" onClick={() => handleMyKoi()}>My Koi</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
