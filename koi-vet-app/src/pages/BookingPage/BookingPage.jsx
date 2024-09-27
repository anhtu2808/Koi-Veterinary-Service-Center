import React from 'react'
import './BookingPage.css'
import { useSelector } from 'react-redux'
function BookingPage() {

  const step = useSelector(state => state.booking.step)

  // const renderStepComponent = () =>{
  //   switch (step) {
  //     case 1:
  //      return <
  // }






  return (
    <div className="container booking-container">
      <h2 className="text-center booking-title">Appoinment Booking</h2>


      <div className="row">
        <div className='row d-flex justify-content-between'>
          <div className="col-md-1">
          <button className="btn btn-primary">Back</button>
          </div>
          <div className="col-md-1">
          <button className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage