import React from "react";
import "./GGM.css";
import GGMeet from "../../assets/img/GGMeet.jpg";

function GGM() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4">
        <div className="row align-items-center">
          <div className="col-12 d-flex justify-content-center mb-4">
            <h2>Online Link</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-center mb-4">
            <img
              src={GGMeet}
              className="img-fluid "
              style={{ width: "50%" }}
              alt="Google Meeting"
            />
          </div>
          <div className="col-lg-6">
            {/* <div className="mb-3">
              <label className="form-label">User:</label>
              <input type="text" className="form-control" readonly />
            </div>
            <div className="mb-3">
              <label className="form-label">Service:</label>
              <input type="text" className="form-control" readonly />
            </div>
            <div className="mb-3">
              <label className="form-label">Date:</label>
              <input type="text" className="form-control" readonly />
            </div>
            <div className="mb-3">
              <label className="form-label">Time:</label>
              <input type="text" className="form-control" readonly />
            </div>
            <div className="mb-3">
              <label className="form-label">Doctor:</label>
              <input type="text" className="form-control" readonly />
            </div> */}
            <div className="mb-3">
              <label className="form-label">Link:</label>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GGM;
