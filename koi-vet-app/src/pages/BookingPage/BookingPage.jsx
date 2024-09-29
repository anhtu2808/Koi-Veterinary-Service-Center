import React, { useEffect } from 'react'
import './BookingPage.css'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import { ServiceStep } from '../BookingStep/ServiceStep/ServiceStep'
import { nextStep, prevStep } from '../../store/bookingSlice'
import { useNavigate } from 'react-router-dom'
import VeterinarianStep from '../BookingStep/VeterinarianStep/VeterinarianStep'
import DatePickStep from '../BookingStep/DataPickStep/DatePickStep'
import Payment from '../Payment/Payment'
import InputKoiStep from '../BookingStep/InputKoiStep/InputKoiStep'
import InputPondStep from '../BookingStep/InputPontStep/InputPondStep'
import PondDetail from '../../components/PondDetail/PondDetail'
function BookingPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const step = useSelector(state => state.booking.step)
  const date = useSelector(state => state.booking.bookingData.date) 
  const startAt = useSelector(state => state.booking.bookingData.startAt) 
  const endAt = useSelector(state => state.booking.bookingData.endAt) 
  const handleNextStep = () => {
    dispatch(nextStep())
  }
  const handleBackStep = () => {
    if(step > 1){
      dispatch(prevStep())     
    }else{
      navigate('/')
    }
  }
 
  console.log(step)
  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return  <ServiceStep/> ;
      case 2:
        return <VeterinarianStep/>;
      case 3:
        return <DatePickStep/>;
      case 4:
        return <InputKoiStep/>;
      case 5:
        return <InputPondStep/>;
      case 6:
        return <Payment/>;
      default:
        return <Loading />;
  }
  }

  useEffect(()=>{
   if(step === 0){
   navigate('/')
   }
   //eslint-disable-next-line
  },[step])




  return (
    <div className="container booking-container">
      <h2 className="text-center booking-title">Appoinment Booking</h2>
      {renderStepComponent()}
          <div className="row">
        <div className='row d-flex justify-content-between'>
          <div className="col-md-1">
            <button className="btn btn-primary" onClick={()=> handleBackStep()}>Back</button>
          </div>

          {step === 2? <div className="col-md-1">
            <button className="btn btn-primary "  onClick={()=> handleNextStep()}>Next</button>
          </div> : null}

          {step === 3? <div className="col-md-1">
            {date && startAt && endAt ? 
            <button className="btn btn-primary "  onClick={()=> handleNextStep()}>Next</button> : null}
          
          </div> : null}
          
         
        </div>
      </div>
    </div>
  )
}

export default BookingPage