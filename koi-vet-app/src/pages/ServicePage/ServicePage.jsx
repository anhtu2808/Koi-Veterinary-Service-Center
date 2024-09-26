import React, { useEffect, useState } from 'react'
import "./ServicePage.css"
import { fecthAllServicesAPI } from '../../apis'
import Service from "../../components/Service/Service"

function ServicePage() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fecthServices = async () => {
            const response = await fecthAllServicesAPI();
            console.log(response)
            setServices(response?.data);
        }
        fecthServices();
    }, [])
  return (
    <>
    <div className="container text-center my-5">
        <div className="container mt-5">
            <div className="text-center mb-5">
                <img src="process-image.png" alt="Process Step"/>
                <h3>Choose Service</h3>
            </div>

        <div className="row">
           

           {
            services.map((service) => {
                return <Service image={service.image} serviceId={service.serviceId} description={service.description} serviceName={service.serviceName} />
            })
           }

            <div className="container text-center my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <label className="input-label" htmlFor="service-input">Another Service</label>
                        <input type="text" id="service-input" className="custom-input" placeholder="Enter your requirement"/>
                    </div>
                </div>
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
    </div>
    </>
  )
}

export default ServicePage