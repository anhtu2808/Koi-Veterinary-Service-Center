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
                return <Service image={service.image} serviceId={service.serviceId} description={service.description} serviceName={service.serviceName} basePrice={service.basePrice} pondPrice={service.pondPrice} koiPrice={service.koiPrice} />
            })
        }
        </div>
        </div>
    </div>
    </>
  )
}

export default ServicePage