import React from "react";
import "./PondInformation.css";

function PondInformation() {
  return (
    <div className="pond container">
      <h1 className="text-center mb-4">Enter Pond Information</h1>
      <form>
        <div className="mb-3">
          <h3 className="text">Pond Quantity</h3>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number of ponds"
            required
          />
        </div>
        <div className="mb-3">
          <h3 className="text">Tank Quantity</h3>
          <input
            type="number"
            className="form-control"
            placeholder="Enter number of tanks"
            required
          />
        </div>
        <div className="mb-3">
          <h3 className="text">Home Address</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="mb-3">
          <h3 className="text">Koi Health Status</h3>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Describe the health status of your koi"
          ></textarea>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary button">
            Previous
          </button>
          <button type="submit" className="btn btn-secondary button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default PondInformation;
