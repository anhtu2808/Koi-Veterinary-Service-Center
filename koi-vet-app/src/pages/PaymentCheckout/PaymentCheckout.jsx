import React, { useEffect, useState } from 'react'
import { fetchSecondInfoPaymentAPI, updateInvoiceAPI } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import './PaymentCheckout.css';
const PaymentCheckout = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const handleCheckout = async () => {
    const response = await updateInvoiceAPI(appointmentDetail.invoiceId, {
      "updateDate": new Date(),
      "totalPrice": 0,
      "paymentStatus": true,
      "appointmentId": appointmentId
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSecondInfoPaymentAPI(appointmentId);
      setAppointmentDetail(response.data);
    }

    fetchData();
  }, [appointmentId]);

  return (
    <div className="container">
      <div className='payment-bill'>


        <h1>Payment Bill</h1>
        <div className="bill-details">
          {
            appointmentDetail && (
              <>
                <p><strong>Code:</strong> {appointmentDetail.code}</p>
                <p><strong>Appointment Date:</strong> {appointmentDetail.appointmentDate}</p>
                <p><strong>Customer Name:</strong> {appointmentDetail.customerName}</p>
                <p><strong>Service Name:</strong> {appointmentDetail.serviceName}</p>
                <p><strong>Location:</strong> {appointmentDetail.location}</p>
                <p><strong>Distance:</strong> {appointmentDetail.distance} (km)</p>
                <p><strong>Start Time:</strong> {appointmentDetail.startTime}</p>
                <p><strong>End Time:</strong> {appointmentDetail.endTime}</p>
                <p><strong>Status:</strong> {appointmentDetail.status}</p>
                <p><strong>Quantity:</strong> {appointmentDetail.quantity} </p>
                <p><strong>Deposited Money:</strong> {appointmentDetail.depositedMoney} VND</p>
                <p><strong>Total Quantity:</strong> {appointmentDetail.totalQuantity} VND</p>
                <p><strong>Balance:</strong> {appointmentDetail.balance} VND</p>
              </>
            )
          }

        </div>

      </div>
      <div className='button-container d-flex justify-content-between'>
        <button className='btn btn-primary' onClick={() => navigate(-1)}>Back</button>
        <button className='btn btn-primary'>Checkout</button>
      </div>
    </div>

  )
}


export default PaymentCheckout
