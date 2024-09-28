import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { nextStep, setBookingData } from '../../store/bookingSlice';
import { useDispatch } from 'react-redux';

const Service = ({ image, serviceId, serviceName, description, isBooking }) => {
  const navigate = useNavigate();
  console.log(serviceName)
  const dispatch = useDispatch()
  const handleClickButton = () => {
    if (isBooking) {
      dispatch(setBookingData({ serviceId: serviceId }))
      dispatch(nextStep())
    } else {
      navigate(`/services/${serviceId}`)
    }
  }
  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="service-card">
          <img src="https://th.bing.com/th/id/R.321680a19267fb82b0bb4ef9709f5ee1?rik=S69lZlF8h%2fU4iA&pid=ImgRaw&r=0"
            alt="Water Quality Testing" />
          <div className="p-3">
            <h5>{serviceName}</h5>
            <p>{description}</p>
            <button onClick={() => handleClickButton()}>Order <i className="btn fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service