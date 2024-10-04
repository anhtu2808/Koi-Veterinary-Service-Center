import React, { useState } from 'react';
import Koi from '../../components/Koi/Koi';
import Modal from '../../components/Modal/Modal';
import {  useNavigate, useParams } from 'react-router-dom';
import KoiDetail from '../KoiDetail/KoiDetail';


const KoiTreatmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [koiUpdateTrigger, setKoiUpdateTrigger] = useState(0);
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  //open modal for when click add new koi BTN
  const handleAddNewKoi = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //update trigger for koi list
  const handleKoiUpdate = () => {
    setKoiUpdateTrigger(prev => prev + 1);
  };
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Koi in this appointment</h3>
      {/* Existing Koi Table */}
      <Koi
        isBooking={false} // đây không phải là booking mà là appointment
        isAppointment={true} // đây là appointment
        appointmentId={appointmentId}
        title={"Koi in this appointment"}
        updateTrigger={koiUpdateTrigger} //trigger update koi list
      />


      {/* Add New Koi Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => handleAddNewKoi()}>
          Add New Koi
        </button>
      </div>

      {/* Modal for KoiDetail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <KoiDetail
          isCreate={true}
          isBooking={false}
          isAppointment={true}
          appointmentId={appointmentId}
          onClose={handleCloseModal}
          onUpdate={handleKoiUpdate}
        />
      </Modal>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default KoiTreatmentPage;
