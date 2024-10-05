import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingData } from '../../../store/bookingSlice';
import './InputPondStep.css'
import PondDetail from '../../../pages/PondDetail/PondDetail';
import Pond from '../../../components/Pond/Pond';
import Modal from '../../../components/Modal/Modal';


const InputPondStep = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pondUpdateTrigger, setPondUpdateTrigger] = useState(0);
  const dispatch = useDispatch();
  const selected = useSelector(state => state.booking.bookingData.selected);

  const handleAddPondToBooking = (pondId) => {
    if (selected.includes(pondId)) {
      // If already selected, remove it
      dispatch(setBookingData({ selected: selected.filter(id => id !== pondId) }));
    } else {
      // If not selected, add it
      dispatch(setBookingData({ selected: [...selected, pondId] }));
    }
  };

  //open modal for when click add new koi BTN
  const handleAddNewPond = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //update trigger for pond list
  const handlePondUpdate = () => {
    setPondUpdateTrigger(prev => prev + 1);
  };

  



  return (
    <div className="container mt-4">
      <h3 className="mb-4">Select Ponds for Appointment</h3>

      {/* Existing Ponds Table */}
      <Pond
        isBooking={true}
        title={"Your Ponds"}
        updateTrigger={pondUpdateTrigger}
        handleAddPondToBooking={handleAddPondToBooking}
        selectedPonds={selected}
      />

      {/* Selected Ponds Details */}
      {/* {selectedPond.length > 0 && (
        <div className="card mb-4">
          <div className="card-header input-info-title text-white">
            <h5 className="mb-0">Selected Pond Details</h5>
          </div>
          <div className="card-body">
            {selectedPond.map(pondId => {
              const selectedPond = existingPonds.find(p => p.pondId === pondId);
              return (
                <div key={pondId} className="mb-4 pb-3 border-bottom">
                  <h4>{selectedPond.name}</h4>
                  <p><strong>Depth:</strong> {selectedPond.depth} m</p>
                  <p><strong>Perimeter:</strong> {selectedPond.perimeter} m</p>
                  <p><strong>Temperature:</strong> {selectedPond.temperature} °C</p>
                  <p><strong>Notes:</strong> {selectedPond.notes}</p>
                  <img src={selectedPond.image} alt={selectedPond.name} className="img-fluid mt-3" style={{ maxWidth: '300px' }} />
                </div>
              );
            })}
          </div>
        </div>
      )} */}

      {/* Add New Pond Button */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddNewPond}>
          Add New Pond
        </button>
      </div>

      {/* Modal for KoiDetail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PondDetail
          isCreate={true}
          isBooking={true}
          onClose={handleCloseModal}
          onUpdate={handlePondUpdate}
        />
      </Modal>
    </div>
  );
};

export default InputPondStep;