import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pond.css';
import { fetchPondByAppointmentIdAPI, fetchPondByCustomerIdAPI } from '../../apis';
import { useSelector } from 'react-redux';

const Pond = ({ title, selectedPonds, onUpdate, isBooking ,isAppointment,appointmentId}) => {
    const navigate = useNavigate();
    const [customerId] = useState(useSelector(state => state?.user?.customer?.customerId))
    const [ponds, setPonds] = useState([])
    useEffect(() => {
        const fetchPonds = async () => {
            try {
                const response = isAppointment
                    ? await fetchPondByAppointmentIdAPI(appointmentId)
                    : await fetchPondByCustomerIdAPI(customerId);
                setPonds(response.data);
            } catch (error) {
                console.error('Error fetching pond list:', error);
            }
        };
        fetchPonds();
    }, [onUpdate, customerId, isAppointment, appointmentId]);
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
                                <th>Depth (m)</th>
                                <th>Perimeter (m)</th>
                                <th>Filter System</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ponds.map((pond) => {
                                const isSelected = selectedPonds?.includes(pond.pondId);
                                return (
                                    <tr key={pond.pondId} className={isSelected ? 'table-primary' : ''}>                              
                                        <td>{pond.depth}</td>
                                        <td>{pond.perimeter}</td>
                                        <td>{pond.filterSystem}</td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/pond/${pond.pondId}`)}>
                                                    View Details
                                                </button>
                                                {isBooking && (
                                                    <button
                                                        className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                        
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

export default Pond;
