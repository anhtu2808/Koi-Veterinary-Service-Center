import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pond.css';

const Pond = ({ title, ponds, selectedPonds, onSelectPond, isBooking }) => {
    const navigate = useNavigate();

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
                                <th>Name</th>
                                <th>Depth (m)</th>
                                <th>Perimeter (m)</th>
                                <th>Temperature (°C)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ponds.map((pond) => {
                                const isSelected = selectedPonds?.includes(pond.pondId);
                                return (
                                    <tr key={pond.pondId} className={isSelected ? 'table-primary' : ''}>
                                        <td>{pond.name}</td>
                                        <td>{pond.depth}</td>
                                        <td>{pond.perimeter}</td>
                                        <td>{pond.temperature}</td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/pond/${pond.pondId}`)}>
                                                    View Details
                                                </button>
                                                {isBooking && (
                                                    <button
                                                        className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                        onClick={() => onSelectPond(pond.pondId)}
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
