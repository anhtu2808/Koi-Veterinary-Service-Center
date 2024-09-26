import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

  const Service = (image, serviceId, serviceName, description,isBooking) => {
    const navigate = useNavigate();
    const handleClickButton= () =>{
      if(isBooking){
        
      }else{
          navigate(`/services/${serviceId}`)
      }
    }
  return (
    <>
    <div className="col-md-4 mb-4">
                    <div className="service-card">
                        <img src={image}
                            alt="Water Quality Testing"/>
                        <div className="p-3">
                            <h5>{serviceName}</h5>
                            <p>{description}</p>
                            <button onClick={()=>handleClickButton()}>Order <i className="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
                </>
  )
}

export default Service