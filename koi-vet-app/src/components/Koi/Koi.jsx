import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Koi.css';
import { useNavigate } from 'react-router-dom';
import { fetchKoisByCustomerIdAPI, fetchKoisByAppointmentIdAPI } from '../../apis';

const Koi = ({ isAppointment, isBooking, title, updateTrigger, appointmentId, handleAddKoiToBooking, selectedKois }) => {
    const [koiList, setKoiList] = useState([]);
    const customerId = useSelector(state => state?.user?.customer?.customerId)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKois = async () => {
            try {
                const response = isAppointment
                    ? await fetchKoisByAppointmentIdAPI(appointmentId)
                    : await fetchKoisByCustomerIdAPI(customerId);
                isAppointment
                    ? response.data.forEach(koiTreatment => {
                        setKoiList(prev => [...prev, koiTreatment.koi]);
                    })
                    : setKoiList(response.data);
                console.log(koiList);
            } catch (error) {
                console.error('Error fetching koi list:', error);
            }
        };
        fetchKois();
    }, [customerId, isAppointment, appointmentId, updateTrigger]);

    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-header input-info-title text-white">
                    <h5 className="mb-0 text-start">{title}</h5>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {/* <th>Koi Id</th> */}
                                <th>Breed</th>
                                <th>Health Status</th>
                                <th>Age</th>
                                <th>Image</th>
                                <th>PRESCRIPTION</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {koiList?.map((koi, index) => {
                                const isSelected = selectedKois?.includes(koi.koiId);
                                return (
                                    <tr key={koi.koiId} className={isSelected ? 'table-primary' : ''}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{koi.breed}</td>
                                        <td>{koi.healthStatus}</td>
                                        <td>{koi.age}</td>
                                        <td>
                                            <div className="koi-image">
                                                <img src="https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg" alt={koi.breed} />
                                            </div>
                                        </td>
                                        <td>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Choose Prescription</option>
                                                <option value="Prescription 1">Prescription 1</option>
                                                <option value="Prescription 2">Prescription 2</option>
                                                <option value="Prescription 1">Prescription 3</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                {isAppointment ?
                                                    <>
                                                        <button className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/koidetail/${koi.koiId}`)}>
                                                            View Details
                                                        </button>
                                                    </>

                                                    :
                                                    <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/koi/${koi.koiId}`)}>
                                                        View Details
                                                    </button>}
                                                {isBooking && (
                                                    <button
                                                        className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                        onClick={() => handleAddKoiToBooking(koi.koiId)}
                                                    >
                                                        {isSelected ? 'Remove' : 'Add'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    


                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Koi;
