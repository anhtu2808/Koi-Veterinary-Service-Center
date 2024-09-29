import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useSelector } from "react-redux";
import { createAppointmentAPI, fecthServiceByServiceIdAPI, fetchVetByVetIdAPI } from "../../apis";

function Payment() {
  const userInfo = useSelector(state => state.user)
  const customerInfo = useSelector(state => state.user.customer)
  const bookingData = useSelector(state => state?.booking?.bookingData)
  const [serviceInfo, setServiceInfo] = useState({})
  const [vetInfo, setVetInfo] = useState({})

  const handlePayment = async (appointmentId, appointmentDate, status, startTime, endTime,
    location, result, createdAt, type, depositedMoney, customerId, vetId, serviceId) => {
    const response = await createAppointmentAPI(appointmentId, appointmentDate, status, startTime, endTime,
      location, result, createdAt, type, depositedMoney, customerId, vetId, serviceId);
    console.log(response)
  }
  // Combine date and time into a single string
  const combinedDateTime = `${bookingData?.date}T${bookingData?.startAt}`;
  useEffect(() => {
    const fetchServiceInfo = async () => {
      const response = await fecthServiceByServiceIdAPI(bookingData?.serviceId)
      setServiceInfo(response?.data)
    }
    fetchServiceInfo()
    const fetchVetInfo = async () => {
      if (bookingData?.vetId) {
        const response = await fetchVetByVetIdAPI(bookingData?.vetId)
        setVetInfo(response?.data)
      }
    }
    fetchServiceInfo()
    fetchVetInfo()
    console.log(vetInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData?.serviceId, bookingData?.vetId])
  return (
    <div className="container payment-container">
      <h1 className="payment-title text-center mb-5">Secure Payment</h1>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="payment-card">
            <div className="payment-card-header">
              <i className="fas fa-user-circle me-2"></i> Member Information
            </div>
            <div className="payment-card-body">
              <div className="mb-3">
                <label htmlFor="fullName" className="payment-form-label">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text payment-input-icon">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control payment-form-control"
                    id="fullName"
                    value={userInfo.fullName}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="payment-form-label">
                  Phone Number
                </label>
                <div className="input-group">
                  <span className="input-group-text payment-input-icon">
                    <i className="fas fa-phone"></i>
                  </span>
                  <input
                    type="tel"
                    className="form-control payment-form-control"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    value={customerInfo?.phone}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="payment-form-label">
                  Address
                </label>
                <div className="input-group">
                  <span className="input-group-text payment-input-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <textarea
                    className="form-control payment-form-control"
                    id="address"
                    rows="3"
                    placeholder="Enter your address"
                    value={customerInfo?.address}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-card">
            <div className="payment-card-header">
              <i className="fas fa-fish me-2"></i> Koi/Pond Health Status
            </div>
            <div className="payment-card-body">
              <div className="mb-3">
                <label htmlFor="koiHealth" className="payment-form-label">
                  Health Description
                </label>
                <textarea
                  className="form-control payment-form-control"
                  id="koiHealth"
                  rows="5"
                  placeholder="Please enter describe about health status of your Koi/Pond"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="payment-card">
            <div className="payment-card-header">
              <i className="fas fa-credit-card me-2"></i> Payment Details
            </div>
            <div className="payment-card-body">
              <div className="mb-3">
                <label htmlFor="doctorName" className="payment-form-label">
                  Doctor's Name
                </label>
                <div className="input-group">
                  <span className="input-group-text payment-input-icon">
                    <i className="fas fa-user-md"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control payment-form-control"
                    id="doctorName"
                    placeholder="Enter doctor's name"
                    value={vetInfo?.user?.fullName}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="dateTime" className="payment-form-label">
                  Appointment Date and Time
                </label>
                <div className="input-group">
                  <span className="input-group-text payment-input-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <input
                    type="datetime-local"
                    className="form-control payment-form-control"
                    id="dateTime"
                    value={combinedDateTime}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="doctorName" className="payment-form-label">
                  Service
                </label>
                <div className="input-group">
                  <span className="input-group-text payment-input-icon">
                    <i class="fas fa-fish"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control payment-form-control"
                    id="doctorName"
                    placeholder="Enter doctor's name"
                    value={serviceInfo?.serviceName}
                  />
                </div>
              </div>

              <div className="payment-summary mb-4">
                <h5 className="mb-3">Payment Summary</h5>
                <div className="row">
                  <div className="col-6">Subtotal:</div>
                  <div className="col-6 text-end">$100.00</div>
                </div>
                <div className="row">
                  <div className="col-6">Service Fee:</div>
                  <div className="col-6 text-end">${serviceInfo.basePrice}</div>
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
                    className="form-check-input payment-form-check-input"
                    type="radio"
                    name="paymentOption"
                    id="momo"
                    value="momo"
                  />
                  <label className="form-check-label payment-form-check-label" htmlFor="momo">
                    <i className="fas fa-mobile-alt me-2"></i> Momo
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input payment-form-check-input"
                    type="radio"
                    name="paymentOption"
                    id="vnpay"
                    value="vnpay"
                  />
                  <label className="form-check-label payment-form-check-label" htmlFor="vnpay">
                    <i className="fas fa-credit-card me-2"></i> VNPay
                  </label>
                </div>
              </div>

              <button className="btn payment-btn w-100" id="checkoutBtn"
                onClick={handlePayment(
                  bookingData?.id,
                  bookingData?.date,
                  "pending",
                  bookingData?.startAt,
                  bookingData?.endAt,
                  bookingData?.location,
                  bookingData?.result,
                  bookingData?.createdAt,
                  bookingData?.type,
                  bookingData?.depositedMoney,
                  bookingData?.customerId,
                  bookingData?.vetId,
                  bookingData?.serviceId)}

              >
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
