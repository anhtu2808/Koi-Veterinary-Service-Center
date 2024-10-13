import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Koi.css';
import { useNavigate } from 'react-router-dom';
import { fetchKoisByCustomerIdAPI, fetchKoisByAppointmentIdAPI, updateKoiTreatmentAPI, fetchPrescriptionByAppointmentIdAPI } from '../../apis';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import Treatment from '../Treatment/Treatment';

const Koi = ({ isAppointment, isBooking, title, onUpdateTreatment, updateTrigger, appointmentId, handleAddKoiToBooking, selectedKois, isVeterinarian }) => {
    const [koiTreatmentList, setKoiTreatmentList] = useState([]);
    const customerId = useSelector(state => state?.user?.customer?.customerId)
    const navigate = useNavigate();
    const role = useSelector(state => state?.user?.role);
    const [prescriptions, setPrescriptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({})
    //open modal for when click add new koi BTN
    const handleSubmitTreatment = () => {
        onUpdateTreatment();
        setIsModalOpen(false);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleViewDetal = (koiId, treatmentId) => {
        if (isAppointment) {
            if (role === "CUSTOMER") {
                navigate(`/profile/koidetail/${appointmentId}?treatmentId=${treatmentId}&appointmentId=${appointmentId}`)
            } else {
                navigate(`/admin/koidetail/${appointmentId}?treatmentId=${treatmentId}&appointmentId=${appointmentId}`)
            }
        } else {
          
            navigate(`${koiId}`) // eq navigate(`/profile/koi/${koiId}`)
        }
    }

    useEffect(() => {
        const fetchKois = async () => {
            try {
                let response;
                if (isAppointment) {
                    response = await fetchKoisByAppointmentIdAPI(appointmentId)
                    setKoiTreatmentList(response.data)

                } else {
                    response = await fetchKoisByCustomerIdAPI(customerId);
                    console.log(response.data)
                    const koiList = response.data.map(koiTreatment =>
                    ({
                        koi: koiTreatment,
                    })
                    )
                    setKoiTreatmentList(koiList);
                    console.log(koiList);
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
    const handleChangePrescription = (treatmentId, prescriptionId, koiId) => {
        const updatePrescriptionId = async () => {
            try {
                const response = await updateKoiTreatmentAPI({
                    koiTreatmentId: treatmentId,
                    prescription_id: prescriptionId === "None" ? null : prescriptionId,
                    koiId: koiId,
                });
                toast.success(response.message);

                // Update the local state or data source to reflect the change
                setKoiTreatmentList(prevList =>
                    prevList.map(treatment =>
                        treatment.koiTreatmentId === treatmentId
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
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {/* <th>Koi Id</th> */}
                                <th>Breed</th>
                                {isAppointment ?
                                    <>
                                        <th>Health Issue</th>
                                        <th>Treatment</th>
                                        <th>Prescription</th>
                                    </> :
                                    <>
                                        <th>Age</th>
                                        <th>Length</th>
                                        <th>Weight</th>
                                        <th>Note</th>
                                    </>}
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {koiTreatmentList?.map((treatment) => {
                                const isSelected = selectedKois?.includes(treatment?.koi?.koiId);
                                return (
                                    <tr key={treatment?.koi?.koiId} className={isSelected ? 'table-primary' : ''}>
                                        <td>{treatment?.koi?.breed}</td>
                                        {isAppointment ?
                                            <>
                                                <td>{treatment?.koi?.healthIssue}</td>
                                                <td>{treatment?.koi?.treatment}</td>
                                                <td >
                                                    <select
                                                        className="form-select w-120"
                                                        aria-label="Default select example"
                                                        onChange={(e) => handleChangePrescription(treatment?.koiTreatmentId, e.target.value, treatment?.koi?.koiId)}
                                                        value={treatment.prescription_id || "None"}
                                                        disabled={role === "CUSTOMER"}
                                                    >
                                                        <option value="None">None</option>
                                                        {prescriptions.map(prescription => (
                                                            <option key={prescription.id} value={prescription.id}>
                                                                {prescription.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </> :
                                            <>
                                                <td>{treatment?.koi?.age}</td>
                                                <td>{treatment?.koi?.length}</td>
                                                <td>{treatment?.koi?.weight}</td>
                                                <td>{treatment?.koi?.note}</td>
                                            </>}

                                        <td>
                                            <div className="koi-image">
                                                <img src={treatment?.koi?.image} alt="hình cá" />
                                            </div>
                                        </td>

                                        <td>
                                            <div className='d-flex gap-3'>
                                                
                                                    <button className="btn btn-sm btn-primary" onClick={() => handleViewDetal(treatment.koi.koiId, treatment?.koiTreatmentId)}>
                                                        View Details
                                                    </button>                                    
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
                    <Modal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onRequestClose={handleCloseModal}
                        children={
                            <Treatment
                                treatment={modalData.treatment}
                                isKoi={true}
                                treatmentId={modalData.koiTreatmentId}
                                onUpdate={handleSubmitTreatment}
                                healthIssue={modalData.healthIssue}
                            />
                        }
                    />
                </div>
            </div>
        </div >
    );
};

export default Koi;
