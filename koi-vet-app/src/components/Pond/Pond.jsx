import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pond.css';
import { fetchPondByCustomerIdAPI, fetchPondsByAppointmentIdAPI } from '../../apis';
import { useSelector } from 'react-redux';

const Pond = ({ title, selectedPonds, onUpdate, isBooking, handleAddPondToBooking, isAppointment, appointmentId ,isVeterinarian}) => {
    const navigate = useNavigate();
    const customerId = useSelector(state => state?.user?.customer?.customerId)
    const [pondTreatmentList, setPondTreatmentList] = useState([])
    useEffect(() => {
        const fetchPonds = async () => {
            try {
                const response = isAppointment
                    ? await fetchPondsByAppointmentIdAPI(appointmentId)
                    : await fetchPondByCustomerIdAPI(customerId);
                setPondTreatmentList(response.data);
                console.log("Ponds:", response.data);
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
                {/* option thiết kế 1 */}
                {
                    <div className="card mb-4">

                        <div className="card-body">
                            {pondTreatmentList.map(pondTreatment => {
                                const isSelected = selectedPonds?.includes(pondTreatment.pond.pondId);
                                return (
                                    <>

                                        <div key={pondTreatment.pond.pondId} className="mb-4 pb-3 border-bottom row align-items-center">
                                            <div className="col-md-6">
                                                <h4>{"Đây là hồ cá koi của anh tú"}</h4>
                                                <p><strong>Depth:</strong> {pondTreatment.pond.depth} m</p>
                                                <p><strong>Perimeter:</strong> {pondTreatment.pond.perimeter} m</p>
                                                <p><strong>Filter System:</strong> {pondTreatment.pond.filterSystem}</p>
                                                <p><strong>Notes:</strong> {pondTreatment.pond.notes}</p>
                                                <p><strong>Health Issue:</strong> {pondTreatment.healthIssue}</p>
                                                <p><strong>Treatment:</strong> {pondTreatment.treatment}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <img src={"https://honnonbomiennam.vn/wp-content/uploads/2022/05/46.jpg"} alt={pondTreatment.pond.name} className="img-fluid mt-3" style={{ maxWidth: '300px' }} />
                                            </div>
                                            <div className="col-md-2">
                                                <div className='d-flex gap-3'>
                                                    {isVeterinarian ? <button className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/ponddetail/${pondTreatment.pond.pondId}`)}>
                                                        View Details
                                                    </button>
                                                        :
                                                        <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/pond/${pondTreatment.pond.pondId}`)}>
                                                            View Details
                                                        </button>}

                                                    {isBooking && (
                                                        <button
                                                            className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                            onClick={() => handleAddPondToBooking(pondTreatment.pond.pondId)}
                                                        >
                                                            {isSelected ? 'Remove' : 'Add'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                );
                            })}
                        </div>
                    </div>
                }
                {/* option thiết kế 2 */}
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

                            {pondTreatmentList.map((pondTreatment) => {
                                const isSelected = selectedPonds?.includes(pondTreatment.pond.pondId);
                                return (
                                    <tr key={pondTreatment.pond.pondId} className={isSelected ? 'table-primary' : ''}>
                                        <td>{pondTreatment.pond.depth}</td>
                                        <td>{pondTreatment.pond.perimeter}</td>
                                        <td>{pondTreatment.pond.filterSystem}</td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/pond/${pondTreatment.pond.pondId}`)}>
                                                    View Details
                                                </button>
                                                {isBooking && (
                                                    <button
                                                        className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                        onClick={() => handleAddPondToBooking(pondTreatment.pond.pondId)}
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
