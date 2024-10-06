import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Koi.css';
import { useNavigate } from 'react-router-dom';
import { fetchKoisByCustomerIdAPI, fetchKoisByAppointmentIdAPI, updateKoiTreatmentAPI } from '../../apis';
import { fetchPrescriptionByAppointmentId } from '../../apis/PrescriptionMockData';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import Treatment from '../Treatment/Treatment';

const Koi = ({ isAppointment, isBooking, title, onUpdateTreatment, updateTrigger, appointmentId, handleAddKoiToBooking, selectedKois }) => {
    const [koiTreatmentList, setKoiTreatmentList] = useState([]);
    const customerId = useSelector(state => state?.user?.customer?.customerId)
    const navigate = useNavigate();
    const [prescriptions, setPrescriptions] = useState([]);
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //open modal for when click add new koi BTN
                                                                                                 
  const handleUpdateTreatment = () => {
    setIsModalOpen(true);
  };
  const handleSubmitTreatment = (e) => {
    e.preventDefault();
    onUpdateTreatment();
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {                                                                 
    setIsModalOpen(false);
  };
  
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
            const response = await fetchPrescriptionByAppointmentId(appointmentId)
            setPrescriptions(response.data)
        }
        fetchKois();
        fetchPrescriptions();
    }, [customerId, isAppointment, appointmentId, updateTrigger]);

    // lưu lại đơn thuốc
    const handleChangePrescription = (treatmentId,e) => {
        setKoiTreatmentList(prevState => prevState.map(treatment => treatment.treatmentId === treatmentId ? {...treatment, prescriptionId: e.target.value} :  treatment))
       const updatePrescriptionId = async () => {
        const response = await updateKoiTreatmentAPI({
            appointmentId: appointmentId,
            prescriptionId: e.target.value,
            treatment: {
                treatmentId: treatmentId,
            },

        })
        toast.success(response.message)
       }
       updatePrescriptionId()
       
    }

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
                                        {/* <td>{index + 1}</td> */}
                                        <td>{treatment?.koi?.breed}</td>
                                        <td > {isAppointment ? treatment?.koi?.healthIssue : treatment?.koi?.healthStatus}</td>
                                        <td>{isAppointment ? treatment?.koi?.treatment : treatment?.koi?.age}</td>
                                        <td>
                                            <div className="koi-image">
                                                <img src="https://visinhcakoi.com/wp-content/uploads/2021/07/ca-koi-showa-2-600x874-1.jpg" alt="hình cá" />
                                            </div>
                                        </td>
                                        <td >
                                            <select className="form-select w-120" aria-label="Default select example" onChange={(e) => handleChangePrescription(treatment?.koiTreatmentId,e)} value={treatment?.prescriptionId}>
                                                <option selected value={null}>Not selected</option>
                                                {prescriptions.map(prescription => (
                                                    <option value={prescription.id}>{prescription.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className='d-flex gap-3'>
                                                {isAppointment ?
                                                    <>
                                                        <button className="btn btn-sm btn-primary" onClick={() => navigate(`/admin/koidetail/${treatment.koi.koiId}`)}>
                                                            View Details
                                                        </button>
                                                    </>

                                                    :
                                                    <button className="btn btn-sm btn-primary" onClick={() => navigate(`/profile/koi/${treatment.koi.koiId}`)}>
                                                        View Details
                                                    </button>}
                                                    <button className="btn btn-sm btn-primary" onClick={handleUpdateTreatment}>
                                                        Enter <br/> Treatment
                                                    </button>
                                                    
                                                    <Modal
                                                        isOpen={isModalOpen}
                                                        onClose={handleCloseModal}
                                                        onRequestClose={handleCloseModal}
                                                        children={
                                                            <Treatment
                                                             handleSubmitTreatment={handleSubmitTreatment}
                                                             treatment={treatment.treatment}
                                                             isKoi={true}
                                                             appointmentId={appointmentId}
                                                             koiId={treatment.koi.koiId}
                                                             onUpdate={onUpdateTreatment}
                                                             healthIssue={treatment.healthIssue}
                                                             />
                                                        }
                                                    >
                                                    </Modal>
                                                        
                                                        
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
