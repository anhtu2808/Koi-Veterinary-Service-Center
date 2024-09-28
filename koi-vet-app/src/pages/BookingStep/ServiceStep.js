import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchServiceByTypeAPI } from '../../apis'
import Service from '../../components/Service/Service'
// Fake data
const fakeServices = [
    {
        serviceId: 1,
        serviceName: "Screen Repair",
        description: "Fix cracked or damaged screens",
        image: "https://example.com/screen-repair.jpg"
    },
    {
        serviceId: 2,
        serviceName: "Battery Replacement",
        description: "Replace old or faulty batteries",
        image: "https://example.com/battery-replacement.jpg"
    },
    {
        serviceId: 3,
        serviceName: "Software Update",
        description: "Update your device's operating system",
        image: "https://example.com/software-update.jpg"
    },
    {
        serviceId: 4,
        serviceName: "Data Recovery",
        description: "Recover lost or deleted data",
        image: "https://example.com/data-recovery.jpg"
    },
    {
        serviceId: 5,
        serviceName: "Camera Repair",
        description: "Fix faulty cameras or lenses",
        image: "https://example.com/camera-repair.jpg"
    },
    {
        serviceId: 6,
        serviceName: "Water Damage Repair",
        description: "Repair water-damaged devices",
        image: "https://example.com/water-damage-repair.jpg"
    }
];
export const ServiceStep = () => {
    const type = useSelector(state => state?.booking?.bookingData?.type)
    const [services, setServices] = useState([]);
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
    useEffect(() => {
        // Simulating API call with setTimeout
        setTimeout(() => {
            setServices(fakeServices);
        }, 500);
    }, [])

    return (
        <>
            <div className="container text-center ">
                <div className="container ">
                    <div className="text-center ">
                      
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
