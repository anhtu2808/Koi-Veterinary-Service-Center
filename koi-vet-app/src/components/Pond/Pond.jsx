import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pond.css';
import { fetchPondsByCustomerIdAPI, fetchPondsByAppointmentIdAPI, fetchPrescriptionByAppointmentIdAPI, updatePondTreatmentAPI } from '../../apis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Treatment from '../Treatment/Treatment';
import Modal from '../Modal/Modal';

const Pond = ({ title, selectedPonds, onUpdate, onUpdateTreatment,updateTrigger, isBooking, handleAddPondToBooking, isAppointment, appointmentId, isVeterinarian }) => {
    const navigate = useNavigate();
    const [pondTreatmentList, setPondTreatmentList] = useState([])
    const customerId = useSelector(state => state?.user?.customer?.customerId)
    const role = useSelector(state => state?.user?.role);
    const [prescriptions, setPrescriptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({})
    //open modal for when click add treatment
    const handleSubmitTreatment = () => {
        onUpdateTreatment();
        setIsModalOpen(false);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleViewDetail = (pondId, treatmentId) => {
        if (isAppointment) {
            if (role === "CUSTOMER") {
                navigate(`/profile/ponddetail/${appointmentId}?treatmentId=${treatmentId}&appointmentId=${appointmentId}`)
            } else {
                navigate(`/admin/ponddetail/${appointmentId}?treatmentId=${treatmentId}&appointmentId=${appointmentId}`)
            }
        } else {
            navigate(`/profile/pond/${pondId}`)
        }
    }
    useEffect(() => {
        const fetchKois = async () => {
            try {
                let response;
                if (isAppointment) {
                    response = await fetchPondsByAppointmentIdAPI(appointmentId)
                    setPondTreatmentList(response.data)

                } else {
                    response = await fetchPondsByCustomerIdAPI(customerId);
                    console.log(response.data)
                    const pondList = response.data.map(pondTreatment =>
                    ({
                        pond: pondTreatment,
                    })
                    )
                    setPondTreatmentList(pondList);
                    console.log(pondList);
                }

            } catch (error) {
                console.error('Error fetching koi list:', error);
            }
        };
        const fetchPrescriptions = async () => {
            const response = await fetchPrescriptionByAppointmentIdAPI(appointmentId)
            setPrescriptions(response.data)
        }
        fetchKois();
        fetchPrescriptions();
    }, [customerId, isAppointment, appointmentId, updateTrigger]);

   // lưu lại đơn thuốc
   const handleChangePrescription = (treatmentId, prescriptionId, pondId) => {
    const updatePrescriptionId = async () => {
        try {
            const response = await updatePondTreatmentAPI({
                pondTreatmentId: treatmentId,
                prescription_id: prescriptionId === "None" ? null : prescriptionId,
                pondId: pondId,
            });
            toast.success(response.message);

            // Update the local state or data source to reflect the change
            setPondTreatmentList(prevList =>
                prevList.map(treatment =>
                    treatment.pondTreatmentId === treatmentId
                        ? { ...treatment, prescription_id: prescriptionId === "None" ? null : prescriptionId }
                        : treatment
                )
            );
        } catch (error) {
            toast.error('Failed to update prescription');
        }
    };
    updatePrescriptionId();
};
    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-header input-info-title text-white">
                    <h5 className="mb-0 text-start">{title}</h5>
                </div>
                
                {/* option thiết kế 1 */}
                {
                    <div className=" mb-4">

                        <div className="card-body">
                            {pondTreatmentList.map(pondTreatment => {
                                const isSelected = selectedPonds?.includes(pondTreatment?.pond?.pondId);
                                return (
                                    <>

                                        <div key={pondTreatment.pond?.pondId} className="d-flexmb-4 pb-3 border-bottom row align-items-center">
                                            <div className="col-md-6 mt-2">
                                                <h4>{"Đây là hồ cá pond của anh tú"}</h4>
                                                <p><strong>Depth:</strong> {pondTreatment?.pond?.depth} m</p>
                                                <p><strong>Perimeter:</strong> {pondTreatment?.pond?.perimeter} m</p>
                                                <p><strong>Filter System:</strong> {pondTreatment?.pond?.filterSystem}</p>
                                                <p><strong>Notes:</strong> {pondTreatment?.pond?.notes}</p>
                                                <p><strong>Health Issue:</strong> {pondTreatment?.healthIssue}</p>
                                                <p><strong>Treatment:</strong> {pondTreatment?.treatment}</p>
                                            </div>
                                            <div className="col-md-4">
                                                <img src={"https://honnonbomiennam.vn/wp-content/uploads/2022/05/46.jpg"} alt={pondTreatment.pond?.name} className="img-fluid mt-3" style={{ maxWidth: '300px' }} />
                                            </div>
                                            <div className="col-md-2">
                                                <div className='row gap-3'>
                                                    <div className='d-flex row flex-column align-items-center gap-2'>
                                                        <div className='col-md-6'>
                                                            {isVeterinarian ?
                                                                <>
                                                                    <button className="btn btn-sm btn-primary px-3" onClick={() => navigate(`/admin/ponddetail/${pondTreatment?.pond?.pondId}`)}>
                                                                        View Details
                                                                    </button>
                                                                </>
                                                                :
                                                                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/pond/${pondTreatment?.pond.pondId}`)}>
                                                                    View Details
                                                                </button>}

                                                            {isBooking && (
                                                                <button
                                                                    className={`btn btn-sm ${isSelected ? 'btn-danger' : 'btn-success'}`}
                                                                    onClick={() => handleAddPondToBooking(pondTreatment?.pond?.pondId)}
                                                                >
                                                                    {isSelected ? 'Remove' : 'Add'}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className='col-md-12 mt-4'>
                                                            <p className='fs-6 fw-normal'> Select Prescription: </p>
                                                        </div>
                                                        <select
                                                            className="form-select w-120"
                                                            aria-label="Default select example"
                                                            onChange={(e) => handleChangePrescription(pondTreatment?.pondTreatmentId, e.target.value, pondTreatment?.pond?.pondId)}
                                                            value={pondTreatment?.prescription_id || "None"}
                                                        >
                                                            <option value="None">None</option>
                                                            {prescriptions.map(prescription => (
                                                                <option key={prescription?.id} value={prescription?.id}>
                                                                    {prescription?.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                );
                            })}
                        </div>
                    </div>
                }

               
            </div>
            <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onRequestClose={handleCloseModal}
                    children={
                        <Treatment
                            treatment={modalData.treatment}
                            isKoi={false}
                            isPond={true}
                            treatmentId={modalData.pondTreatmentId}
                            onUpdate={handleSubmitTreatment}
                            healthIssue={modalData.healthIssue}
                        />
                    }
                />
        </div>
    );
};

export default Pond;
