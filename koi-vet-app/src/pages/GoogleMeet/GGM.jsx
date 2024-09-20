import React from "react";
import "./GGM.css";
import GGMeet from "../../assets/img/GGMeet.jpg";

function GGM() {
  return (
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-lg p-4">
        <div class="row align-items-center">
          <div class="col-12 d-flex justify-content-center mb-4">
            <h2>Online Link</h2>
          </div>
          <div class="col-lg-6 d-flex justify-content-center mb-4">
            <img
              src={GGMeet}
              class="img-fluid "
              style={{ width: "50%" }}
              alt="Google Meeting"
            />
          </div>
          <div class="col-lg-6">
            <div class="mb-3">
              <label class="form-label">User:</label>
              <input type="text" class="form-control" readonly />
            </div>
            <div class="mb-3">
              <label class="form-label">Service:</label>
              <input type="text" class="form-control" readonly />
            </div>
            <div class="mb-3">
              <label class="form-label">Date:</label>
              <input type="text" class="form-control" readonly />
            </div>
            <div class="mb-3">
              <label class="form-label">Time:</label>
              <input type="text" class="form-control" readonly />
            </div>
            <div class="mb-3">
              <label class="form-label">Doctor:</label>
              <input type="text" class="form-control" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GGM;
