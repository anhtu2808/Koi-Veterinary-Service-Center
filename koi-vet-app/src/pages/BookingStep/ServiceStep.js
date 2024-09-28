import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchServiceByTypeAPI } from '../../apis'
import Service from '../../components/Service/Service'

export const ServiceStep = () => {
    const type = useSelector(state => state?.booking?.bookingData?.type)
    const [services,setServices] = useState([]);
    // useEffect(() => {
    //     const fetchServiceByType = async (type) => {
    //         console.log(type);
    //         const response = await fetchServiceByTypeAPI(type);
    //         setServices(response.data);
    //     }
    //     fetchServiceByType(type);
    // }, [type])

    useEffect(() => {
        const fetchServiceByType = async () => {
            
            const response = await fetchServiceByTypeAPI("mobile");
          
        }
        fetchServiceByType();
    }, [])
    return (
        <>
            <div className="container text-center my-5">
                <div className="container mt-5">
                    <div className="text-center mb-5">
                        <img src="process-image.png" alt="Process Step" />
                        <h3>Choose Service</h3>
                    </div>

                    <div className="row">
                        {
                            services.map((service) => {
                                return (
                                    <Service
                                        image={service.image}
                                        serviceId={service.serviceId}
                                        description={service.description}
                                        isBooking={true}
                                        serviceName={service.serviceName}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
