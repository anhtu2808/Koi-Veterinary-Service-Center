import React from 'react'
import './BookingPage.css'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { ServiceStep } from '../BookingStep/ServiceStep'
function BookingPage() {

  const step = useSelector(state => state.booking.step)
  console.log(step)
  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return ;
      case 2:
        return <ServiceStep/>;
      case 3:
        return <></>;
      case 4:
        return <></>;
      default:
        return <Loading />;
  }
  }






  return (
    <div className="container booking-container">
      <h2 className="text-center booking-title">Appoinment Booking</h2>
      {renderStepComponent()}
          <div className="row">
        <div className='row d-flex justify-content-between'>
          <div className="col-md-1">
            <button className="btn btn-primary">Back</button>
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary ">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage