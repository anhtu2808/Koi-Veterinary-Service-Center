import React, { useState } from 'react';
import Koi from '../../components/Koi/Koi';
import Modal from 'antd/es/modal/Modal';
import {  useParams } from 'react-router-dom';
import KoiDetail from '../KoiDetail/KoiDetail';


const KoiTreatmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [koiUpdateTrigger, setKoiUpdateTrigger] = useState(0);
  const { appointmentId } = useParams();
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
      <h3 className="mb-4">Select Koi for Appointment</h3>
      {/* Existing Koi Table */}
      <Koi
        isBooking={false}
        isAppointment={true}
        appointmentId={appointmentId}
        title={"Your Kois"}
        updateTrigger={koiUpdateTrigger}
      />
      {/* Add New Koi Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddNewKoi}>
          Add New Koi
        </button>
      </div>

      {/* Modal for KoiDetail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <KoiDetail
          isCreate={true}
          isBooking={false}
          isTreatment={true}
          onClose={handleCloseModal}
          onUpdate={handleKoiUpdate}
        />
      </Modal>
    </div>
  );
};

export default KoiTreatmentPage;
