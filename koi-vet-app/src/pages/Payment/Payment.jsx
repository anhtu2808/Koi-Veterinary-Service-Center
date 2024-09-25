import React from "react";
import "./Payment.css";

function Payment() {
  return (
    <div className="container">
      <h1 className="payment-title text-center mb-5">Secure Payment</h1>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <i className="fas fa-user-circle me-2"></i> Member Information
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-phone"></i>
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    placeholder="Enter your address"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <i className="fas fa-fish me-2"></i> Koi Health Status
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="koiHealth" className="form-label">
                  Health Description
                </label>
                <textarea
                  className="form-control"
                  id="koiHealth"
                  rows="5"
                  placeholder="Describe the health status of your Koi"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <i className="fas fa-credit-card me-2"></i> Payment Details
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="doctorName" className="form-label">
                  Doctor's Name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-user-md"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorName"
                    placeholder="Enter doctor's name"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="dateTime" className="form-label">
                  Appointment Date and Time
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="dateTime"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="serviceType" className="form-label">
                  Service Type
                </label>
                <select className="form-select" id="serviceType">
                  <option value="">Select Service Type</option>
                  <option value="consultation">Consultation</option>
                  <option value="treatment">Treatment</option>
                  <option value="checkup">Check-up</option>
                </select>
              </div>

              <div className="payment-summary mb-4">
                <h5 className="mb-3">Payment Summary</h5>
                <div className="row">
                  <div className="col-6">Subtotal:</div>
                  <div className="col-6 text-end">$100.00</div>
                </div>
                <div className="row">
                  <div className="col-6">Service Fee:</div>
                  <div className="col-6 text-end">$10.00</div>
                </div>
                <hr />
                <div className="row total">
                  <div className="col-6">Total (incl. tax):</div>
                  <div className="col-6 text-end">$121.00</div>
                </div>
              </div>

              <div className="payment-options mb-4">
                <h5 className="mb-3">Payment Method</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentOption"
                    id="momo"
                    value="momo"
                  />
                  <label className="form-check-label" htmlFor="momo">
                    <i className="fas fa-mobile-alt me-2"></i> Momo
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentOption"
                    id="vnpay"
                    value="vnpay"
                  />
                  <label className="form-check-label" htmlFor="vnpay">
                    <i className="fas fa-credit-card me-2"></i> VNPay
                  </label>
                </div>
              </div>

              <button className="btn btn-primary w-100" id="checkoutBtn">
                <i className="fas fa-lock me-2"></i> Proceed to Secure Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
