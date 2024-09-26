import React, { useEffect, useState } from "react";
import veterinarian from "../../assets/img/veterinarian.png";
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
          <img src="process-image.png" alt="Process Step" />
          <h3>Choose Doctor</h3>
        </div>

        <div className="row">
          {/* <!-- Doctor Card 1 --> */}
          {
           veterinarians?.map((vet) => {
            console.log({vet});
            return <Veterinarian image={vet.image} vetId={vet.vetId} name={vet?.user?.full_name} />
           })
          }
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn-nav">
            <i className="fas fa-arrow-left"></i> Previous Step
          </button>
          <button className="btn-nav">
            Next Step <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VeterinarianPage;
