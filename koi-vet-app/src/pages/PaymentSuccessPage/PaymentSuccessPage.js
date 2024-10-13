import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';
import { resetBoking } from '../../store/bookingSlice';
import { useDispatch } from 'react-redux';
const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(resetBoking())
  },[dispatch])
  const handleBackToHome = () => {
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div className="custom-payment-success-container">
      <div className="custom-success-message">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your transaction has been completed successfully.</p>
        <button onClick={handleBackToHome} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;