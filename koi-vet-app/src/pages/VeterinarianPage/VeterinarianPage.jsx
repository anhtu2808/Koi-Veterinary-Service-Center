import React, { useEffect, useState } from "react";
import "./VeterinarianPage.css";
import { fetchVetsAPI } from "../../apis";
import Veterinarian from "../../components/Veterinarian/Veterinarian";

function VeterinarianPage() {
    const [veterinarians, setVeterinarians] =useState([]);
  
  useEffect(()=>{
    const fetchVeterinarians =  async () =>{
      const response = await fetchVetsAPI();
      console.log({response});
      setVeterinarians(response?.data);
    }
    fetchVeterinarians();
  },[])

  return (
    console.log({veterinarians}),
    <div className="container text-center my-5">
      <div className="container mt-5">
        <div className="text-center mb-5">
          {/* <img src="process-image.png" alt="Process Step" /> */}
          <h3>Our Veterinarians</h3>
        </div>

        <div className="row">
          {/* <!-- Doctor Card 1 --> */}
          {
           veterinarians?.map((vet) => {
            console.log({vet});
            return <Veterinarian image={vet.imageVeterinarian} vetId={vet.vetId} name={vet?.user?.fullName} isBooking={false} services={vet?.serviceNames} />
           })
          }
        </div>\
      </div>
    </div>
  );
}

export default VeterinarianPage;
