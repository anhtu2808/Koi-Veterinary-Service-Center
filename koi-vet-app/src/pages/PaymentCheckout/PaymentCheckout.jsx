import React, { useEffect, useState } from 'react'
import { fetchSecondInfoPaymentAPI } from '../../apis';
import { useParams } from 'react-router-dom';

const PaymentCheckout = () => {
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const { appointmentId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSecondInfoPaymentAPI(appointmentId);            
      setAppointmentDetail(response.data);
    }

    fetchData();
  }, []);
  return (
    <div>
        
    </div>
  )
}

export default PaymentCheckout
