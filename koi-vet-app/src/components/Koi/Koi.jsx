import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Koi.css';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchKoisByCustomerIdAPI } from '../../apis';
import { fetchKoisByAppointmentIdAPI } from '../../apis/KoiMockData';



const Koi = ({ isAppointment, isBooking,title }) => {
    const [koiList, setKoiList] = useState([]); // Use sample data
    const customerId = useSelector(state => state?.user?.customer?.customerId);
    const {appointmentId} = useParams();
    console.log(koiList);
    const navigate = useNavigate();
    useEffect(() => {
       const fetchKoisByCustomerId = async (customerId) => {
        const response = await fetchKoisByCustomerIdAPI(customerId);
        setKoiList(response.data);
        console.log(response);
       }
       const fetchKoisByAppointmentId = async (appoinmentId) => {
        const response = await fetchKoisByAppointmentIdAPI(appoinmentId);
        setKoiList(response.data);
        console.log(response);
       }
       if(isAppointment){
        fetchKoisByAppointmentId(appointmentId);
       }else{
        fetchKoisByCustomerId(customerId);
       }
    },[customerId,isAppointment,appointmentId]);    
    return (
        <div className="container mt-4">
            {isAppointment?<h3 className="mb-4 text-center">Choose Your Koi</h3>:null}
            

            {/* Existing Koi Table */}
            <div className="card mb-4">
                <div className="card-header input-info-title text-white">
                    <h5 className="mb-0 text-start">{title}</h5>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Koi Id</th>
                                <th>Name</th>
                                <th>breed</th>
                                <th>Age</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                koiList?.map((koi, index) => (
                                    <tr key={koi.koiId}>
                                        <td>{index + 1}</td>
                                        <td>{koi.name}</td>
                                        <td style={{ width: "30%" }}>{koi.breed}</td>
                                        <td>{koi.age}</td>
                                        <td>
                                            <div className="koi-image">
                                                <img src="https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg" alt={koi.name} />
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/koi/${koi.koiId}`)}  >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Add New Koi Button */}
        </div>
    );
};

export default Koi
