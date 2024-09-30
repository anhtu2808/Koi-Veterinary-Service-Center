import React, { useEffect, useState } from 'react'
import Veterinarian from '../../../components/Veterinarian/Veterinarian';
import { fetchVetByServiceIdAPI } from '../../../apis';
import { useSelector } from 'react-redux';

const VeterinarianStep = () => {
    const [veterinarians, setVeterinarians] =useState([]);
    const serviceId = useSelector(state => state.booking.bookingData.serviceId);
  useEffect(()=>{
    const fetchVeterinarians =  async () =>{
      const response = await fetchVetByServiceIdAPI(serviceId); // thay bằng fetchVetByVetByServiceIdAPI
      console.log({response});
      setVeterinarians(response?.data);
    }
    fetchVeterinarians();
  },[serviceId])

  return (
    console.log({veterinarians}),
    <div className="container text-center my-5">
      <div className="container mt-5">
        <div className="text-center mb-5">
          <img src="process-image.png" alt="Process Step" />
          <h3>Choose Doctor</h3>
        </div>

        <div className="row">
          {/* <!-- Doctor Card 1 --> */}
          {
           veterinarians?.map((vet) => {
            console.log({vet});
            return <Veterinarian image={vet.image} vetId={vet.vetId} name={vet?.user?.fullName} isBooking={true} />
           })
          }
        </div>
    
      </div>
    </div>
  );
}

export default VeterinarianStep