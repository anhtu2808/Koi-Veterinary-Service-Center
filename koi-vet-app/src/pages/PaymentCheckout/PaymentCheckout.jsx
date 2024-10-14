import React, { useEffect, useState } from 'react'
import { fecthServiceByServiceIdAPI, fetchSecondInfoPaymentAPI, updateInvoiceAPI } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import './PaymentCheckout.css';
import { toast } from 'react-toastify';
const PaymentCheckout = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const data = {
    appointmentId: "4d48e536-efd7-4773-b977-7ed0cdd2b5fc",
    appointmentDate: "2024-10-09",
    customerName: "Đặng Mai Anh Tú",
    serviceName: "Fish Disease Treatment",
    location: "Số 17, đường Cù Chính Lan, TT.Dương Minh Châu, Tây Ninh",
    startTime: "09:00:00",
    endTime: "10:00:00",
    depositedMoney: 0,
    totalQuantity: 200,
    balance: 200,
    code: "C45",
    items: [
      { name: "Fish Disease Treatment", quantity: 1, price: 200, total: 200 },
      // Bạn có thể thêm nhiều item khác nếu cần
    ]
  };

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
    <div className="container">

      <div className="bill-details">
        {
          appointmentDetail && serviceDetail && (
            <>
              <div className="payment-bill">

                <h1>Invoice</h1>
                <p><strong>Appointment Code:</strong> {data.code}</p>
                <p><strong>Appointment Date:</strong> {data.appointmentDate}</p>
                <p><strong>Customer Name:</strong> {data.customerName}</p>
                <p><strong>Location:</strong> {data.location}</p>
                <p><strong>Start Time:</strong> {data.startTime}</p>
                <p><strong>End Time:</strong> {data.endTime}</p>

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
                        <td>{appointmentDetail.totalQuantity}</td>
                      </tr>
                      <tr>
                        <td>Home visit fee</td>
                        <td>1</td>
                        <td>Km</td>
                        <td>{serviceDetail.homeVisitFee} VND/Km</td>
                        <td>{serviceDetail.homeVisitFee} VND</td>
                      </tr>
                  </tbody>
                </table>

                <div className="summary">
                  <p><strong>Deposited Money:</strong> {data.depositedMoney} VND</p>
                  <p><strong>Balance:</strong> {data.balance} VND</p>
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
