import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Koi.css';
import { useNavigate } from 'react-router-dom';
import { fetchKoisByCustomerIdAPI, fetchKoisByAppointmentIdAPI, updateKoiInTreatmentAPI } from '../../apis';
import { fetchPrescriptionByAppointmentId } from '../../apis/PrescriptionMockData';
import { toast } from 'react-toastify';

const Koi = ({ isAppointment, isBooking, title, updateTrigger, appointmentId, handleAddKoiToBooking, selectedKois }) => {
    const [koiTreatmentList, setKoiTreatmentList] = useState([]);
    const customerId = useSelector(state => state?.user?.customer?.customerId);
    const navigate = useNavigate();
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPrescriptions, setSelectedPrescriptions] = useState({});

    useEffect(() => {
        const fetchKois = async () => {
            try {
                let response;
                if (isAppointment) {
                    response = await fetchKoisByAppointmentIdAPI(appointmentId);
                    setKoiTreatmentList(response.data);
                } else {
                    response = await fetchKoisByCustomerIdAPI(customerId);
                    const koiList = response.data.map(koiTreatment => ({
                        koi: koiTreatment,
                    }));
                    setKoiTreatmentList(koiList);
                }
            } catch (error) {
                console.error('Error fetching koi list:', error);
            }
        };

        const fetchPrescriptions = async () => {
            const response = await fetchPrescriptionByAppointmentId(appointmentId);
            setPrescriptions(response.data);
        };

        fetchKois();
        fetchPrescriptions();
    }, [customerId, isAppointment, appointmentId, updateTrigger]);

    const handleChangePrescription = (koiId, prescriptionId) => {
        setSelectedPrescriptions(prevState => ({
            ...prevState,
            [koiId]: prescriptionId,    
        }));

        const updateTreatment = async () => {
            const response = await updateKoiInTreatmentAPI({
                appointmentId: appointmentId,
                prescriptionId: prescriptionId,
                koiId: koiId
            });
            toast.success(response.message);
        };
        updateTreatment();
    };

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
                                <th>Breed</th>
                                <th>{isAppointment ? "Health Issue" : "Health Status"}</th>
                                <th>{isAppointment ? "Treatment" : "Age"}</th>
                                <th>Image</th>
                                <th>PRESCRIPTION</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {koiTreatmentList?.map((treatment) => {
                                const isSelected = selectedKois?.includes(treatment?.koi?.koiId);
                                return (
                                    <tr key={treatment?.koi?.koiId} className={isSelected ? 'table-primary' : ''}>
                                        <td>{treatment?.koi?.breed}</td>
                                        <td>{isAppointment ? treatment?.koi?.healthIssue : treatment?.koi?.healthStatus}</td>
                                        <td>{isAppointment ? treatment?.koi?.treatment : treatment?.koi?.age}</td>
                                        <td>
                                            <div className="koi-image">
                                                <img src="https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg" alt="hình cá" />
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select w-120"
                                                aria-label="Default select example"
                                                onChange={(e) => handleChangePrescription(treatment.koi.koiId, e.target.value)}
                                                value={selectedPrescriptions[treatment.koi.koiId] || ''}
                                            >
                                                <option value="">Not selected</option>
                                                {prescriptions.map(prescription => (
                                                    <option key={prescription.id} value={prescription.id}>
                                                        {prescription.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                {isAppointment ?
                                                    <button className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/koidetail/${treatment.koi.koiId}`)}>
                                                        View Details
                                                    </button>
                                                    :
                                                    <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/koi/${treatment.koi.koiId}`)}>
                                                        View Details
                                                    </button>}
                                                {isBooking && (
                                                    <button
                                                        className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                        onClick={() => handleAddKoiToBooking(treatment.koi.koiId)}
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