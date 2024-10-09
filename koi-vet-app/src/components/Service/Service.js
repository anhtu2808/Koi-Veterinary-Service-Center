import React from 'react'
import { useNavigate } from 'react-router-dom'
import { nextStep, setBookingData } from '../../store/bookingSlice';
import { useDispatch } from 'react-redux';
import './Service.css'
const Service = ({ image, serviceId, serviceName, description, isBooking, serviceFor, basePrice, pondPrice, koiPrice }) => {
  const navigate = useNavigate();
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
    <div className="col-md-4 mb-4">
      <div className="custom-service-card">
        <img className="w-100 custom-img-fluid" src="https://cafishvet.com/wp-content/uploads/2024/09/Ultrasound-Jessie-Sanders-Fish-Vetranarian-2048x1366.jpg" alt={serviceName} />
        <div className="p-3 d-flex flex-column description-container"  >
          <h5>{serviceName}</h5>
          <p className="description flex-grow-1 m-0 text-start" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {truncateDescription(description, 100)}
          </p>
          <div className="text-start mb-2">
            <div>Service Price: ${(basePrice * 1000).toLocaleString()}</div>
            {serviceFor === "POND" ?

              <div>Pond Price: ${(pondPrice * 1000).toLocaleString()} / Pond</div>
              :
              <div>Koi Price: ${(koiPrice * 1000).toLocaleString()} / Koi</div>

            }
          </div>
          <button onClick={handleClickButton} className='btn btn-primary mt-auto'>
            {isBooking ? 'Order' : 'Detail'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Service