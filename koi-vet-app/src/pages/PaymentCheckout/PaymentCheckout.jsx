import React, { useEffect, useState } from 'react'
import { fecthServiceByServiceIdAPI, fetchSecondInfoPaymentAPI, updateInvoiceAPI } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import './PaymentCheckout.css';
import { toast } from 'react-toastify';
import HomeVisitPriceTable from '../../components/HomeVisitPriceTable/HomeVisitPriceTable';
const PaymentCheckout = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const response = await updateInvoiceAPI(appointmentDetail.invoiceId, {
      "updateDate": new Date(),
      "totalPrice": appointmentDetail.depositedMoney + appointmentDetail.balance,
      "paymentStatus": true,
      "appointmentId": appointmentId
    })
    toast.success("Checkout successful");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSecondInfoPaymentAPI(appointmentId);
      setAppointmentDetail(response.data);
    }
    fetchData();
  }, [appointmentId]);
  useEffect(() => {
    const fetchServiceDetail = async () => {
      const response = await fecthServiceByServiceIdAPI(appointmentDetail.serviceId);
      setServiceDetail(response.data);
    }
    fetchServiceDetail();
  }, [appointmentDetail]);

  return (
    <div className="row">
      <div className="bill-details col-md-4">
        <HomeVisitPriceTable />
      </div>
      <div className="bill-details col-md-8">
        {
          appointmentDetail && serviceDetail && (
            <>
              <div className="payment-bill">

                <h1>Invoice</h1>
                <p><strong>Appointment Code:</strong> {appointmentDetail.code}</p>
                <p><strong>Appointment Date:</strong> {appointmentDetail.appointmentDate}</p>
                <p><strong>Customer Name:</strong> {appointmentDetail.customerName}</p>
                <p><strong>Location:</strong> {appointmentDetail.location}</p>
                <p><strong>Start Time:</strong> {appointmentDetail.startTime}</p>
                <p><strong>End Time:</strong> {appointmentDetail.endTime}</p>

                <table className="bill-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td>{serviceDetail.serviceName}</td>
                      <td>{appointmentDetail.quantity}</td>
                      <td>{serviceDetail.serviceFor === "FISH" ? "Koi" : "Pond"}</td>
                      <td>{serviceDetail.serviceFor === "FISH" ? serviceDetail.koiPrice : serviceDetail.pondPrice} VND</td>
                      <td>{appointmentDetail.totalKoiPondFee} VND</td>
                    </tr>
                    <tr>
                      <td>Home visit fee</td>
                      <td>{appointmentDetail.distance}</td>
                      <td>Km</td>
                      <td>{appointmentDetail.homeVisitPrice} VND/Km</td>
                      <td>{appointmentDetail.totalHomeVisitFee} VND</td>
                    </tr>
                  </tbody>
                </table>

                <div className="summary">
                  <p><strong>Deposited Money:</strong> {appointmentDetail.depositedMoney} VND</p>
                  <p><strong>Balance:</strong> {appointmentDetail.balance} VND</p>
                </div>
              </div>
            </>
          )
        }

      </div>
      <div className='button-container d-flex justify-content-between'>
        <button className='btn btn-primary' onClick={() => navigate(-1)}>Back</button>
        <button className='btn btn-primary' onClick={() => handleCheckout()}>Checkout</button>
      </div>
    </div>

  )
}


export default PaymentCheckout
