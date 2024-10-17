import React from 'react'
import { useNavigate } from 'react-router-dom'
import tempt_img from '../../assets/img/veterinarian.png'
import { useDispatch } from 'react-redux'
import { nextStep, setBookingData } from '../../store/bookingSlice'
const Veterinarian = ({image,vetId,name,isBooking}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChooseVeterinarian = () => {
    dispatch(setBookingData({vetId: vetId}))
    dispatch(nextStep())
  }


  const handleViewProfileVet = () => {
    navigate(`/vetprofile/${vetId}`)
  }


  return (
    <>
   
    {/* <!-- Doctor Card 1 --> */}
    <div className="col-md-4 mb-4">
            <div className="doctor-card">
              <img src={image || tempt_img } alt="Doctor 1" />
              <div className="p-3">
                <h5>{name}</h5>
                <p>CVIS & VFDS</p>
                <div className="icon-group">
                  <i className="fas fa-user"></i>
                  <i className="fas fa-phone"></i>
                  <i className="fas fa-envelope"></i>
                </div>\

                  <button className="btn-view-profile mt-3" onClick={() => handleViewProfileVet()}>
                    View Profile
                  </button>

                {isBooking?<button onClick={()=> handleChooseVeterinarian()} className="btn-view-profile  mt-3">
                   Choose
                  </button>
                  
                  :null}
                
              </div>
            </div>
          </div>
    </>
  )
}

export default Veterinarian