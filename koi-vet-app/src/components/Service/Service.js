import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { nextStep, setBookingData } from '../../store/bookingSlice';
import { useDispatch } from 'react-redux';

const Service = ({ image, serviceId, serviceName, description, isBooking, serviceFor }) => {
  const navigate = useNavigate();
  console.log(serviceName)
  const dispatch = useDispatch()
  const handleClickButton = () => {
    if (isBooking) {
      dispatch(setBookingData({ serviceId: serviceId }))
      dispatch(setBookingData({ serviceFor: serviceFor }))
      dispatch(setBookingData({ serviceName: serviceName }))
      dispatch(nextStep())
    } else {
      navigate(`/services/${serviceId}`)
    }
  }

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className="service-card">
          <img src="https://cafishvet.com/wp-content/uploads/2024/09/Ultrasound-Jessie-Sanders-Fish-Vetranarian-2048x1366.jpg"
            alt="Water Quality Testing" />
          <div className="p-3 d-flex flex-column" style={{ height: '200px' }}>
            <h5>{serviceName}</h5>
            <p className="description flex-grow-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {truncateDescription(description, 100)}
            </p>

            <div>

              <button onClick={() => handleClickButton()}
                className='btn btn-primary'>{isBooking ? 'Order' : 'Detail'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service