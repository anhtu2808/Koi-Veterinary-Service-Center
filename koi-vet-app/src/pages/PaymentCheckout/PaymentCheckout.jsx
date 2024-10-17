import React, { useEffect, useState } from 'react'
import { fecthServiceByServiceIdAPI, fetchSecondInfoPaymentAPI, updateAppointmentAPI, updateInvoiceAPI } from '../../apis';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './PaymentCheckout.css';
import { toast } from 'react-toastify';
import HomeVisitPriceTable from '../../components/HomeVisitPriceTable/HomeVisitPriceTable';
import { APPOINTMENT_STATUS } from '../../utils/constants';
const PaymentCheckout = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const location = useLocation();
  const { appointment } = location.state || {}; // Nhận state appointment
  const [serviceDetail, setServiceDetail] = useState(null);
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const confirmAction = window.confirm("Are you sure to confirm checkout?");
    if (!confirmAction) {
      return;
    } else {
      const invoiceResponse = await updateInvoiceAPI(appointmentDetail.invoiceId, appointment)
      if (invoiceResponse.status === 200) {
        const res = await updateAppointmentAPI(
          {
            ...appointment,
            status: APPOINTMENT_STATUS.FINISH
          }, appointmentId)
        if (res.status === 200) {
          toast.success("Checkout success");
          navigate(-1)
        }
      } else {
        toast.error("Checkout failed");
      }
    }
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
    <div className="row justify-content-center">

      {appointment?.type === "HOME" && <div className="bill-details col-md-4">
        <HomeVisitPriceTable />
      </div>}
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
                      <td>{serviceDetail.serviceFor === "FISH" ? serviceDetail.koiPrice.toLocaleString() : serviceDetail.pondPrice.toLocaleString()} VND</td>
                      <td>{appointmentDetail.totalKoiPondFee.toLocaleString()} VND</td>
                    </tr>
                    <tr>
                      <td>Home visit fee</td>
                      <td>{appointmentDetail.distance}</td>
                      <td>Km</td>
                      <td>{appointmentDetail.homeVisitPrice.toLocaleString()} VND/Km</td>
                      <td>{appointmentDetail.totalHomeVisitFee.toLocaleString()} VND</td>
                    </tr>
                  </tbody>
                </table>

                <div className="summary text-end d-flex justify-content-between">
                  <div className="text-start">
                  <p><strong>Deposited Money:</strong> {appointmentDetail.depositedMoney.toLocaleString()} VND</p>
                  <p><strong>Balance Due:</strong> {appointmentDetail.balanceDue.toLocaleString()} VND</p>
                  </div>
                </div>
              </div>
            </>
          )
        }

      </div>
      <div className='button-container d-flex justify-content-between mt-3'>
        <button className='btn btn-primary' onClick={() => navigate(-1)}>Back</button>
        <button className='btn btn-primary' onClick={() => handleCheckout()}>Confirm Checkout</button>
      </div>
    </div>

  )
}


export default PaymentCheckout
