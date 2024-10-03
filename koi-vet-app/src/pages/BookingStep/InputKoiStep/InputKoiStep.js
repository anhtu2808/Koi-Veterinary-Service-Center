import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBookingData } from '../../../store/bookingSlice';
import './InputKoiStep.css'
import { useNavigate } from 'react-router-dom';
import Koi from '../../../components/Koi/Koi';
import Modal from '../../../components/Modal/Modal';
import KoiDetail from '../../KoiDetail/KoiDetail';
import { fetchKoiByCustomerIdAPI } from '../../../apis/KoiMockData';

// Import the sample data
const sampleKoiData = [
  {
    koiId: 1,
    name: "Kohaku",
    type: "Kohaku",
    age: 3,
    length: 45,
    weight: 2.5,
    color: "White with red patterns",
    description: "A beautiful Kohaku with vibrant red markings"
  },
  {
    koiId: 2,
    name: "Taisho",
    type: "Sanke",
    age: 2,
    length: 35,
    weight: 1.8,
    color: "White with red and black patterns",
    description: "A young Sanke with promising color development"
  },
  {
    koiId: 3,
    name: "Showa",
    type: "Showa Sanshoku",
    age: 4,
    length: 50,
    weight: 3.2,
    color: "Black with red and white patterns",
    description: "An elegant Showa with balanced color distribution"
  },
  {
    koiId: 4,
    name: "Platinum",
    type: "Ogon",
    age: 1,
    length: 25,
    weight: 0.8,
    color: "Solid platinum",
    description: "A young Ogon with a lustrous platinum sheen"
  },
  {
    koiId: 5,
    name: "Butterfly",
    type: "Butterfly Koi",
    age: 5,
    length: 60,
    weight: 4.0,
    color: "Orange and white with long fins",
    description: "A majestic Butterfly Koi with flowing fins"
  },
  {
    koiId: 6,
    name: "Azure",
    type: "Asagi",
    age: 3,
    length: 40,
    weight: 2.2,
    color: "Blue scales with red highlights",
    description: "An Asagi with a striking blue netted pattern"
  },
  {
    koiId: 7,
    name: "Tancho",
    type: "Tancho Kohaku",
    age: 2,
    length: 30,
    weight: 1.5,
    color: "White with a red circle on head",
    description: "A Tancho Kohaku with a perfect circular red patch"
  }
];


const InputKoiStep = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [koiUpdateTrigger, setKoiUpdateTrigger] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerId = useSelector(state => state.user.customer.customerId);
  const selectedKois = useSelector(state => state.booking.bookingData.selectedKoi);
  const [allKoi, setAllKoi] = useState([]);

  const handleAddKoiToBooking = (koiId) => {
    if (selectedKois.includes(koiId)) {
      // If already selected, remove it
      dispatch(setBookingData({ selectedKoi: selectedKois.filter(id => id !== koiId) }));
    } else {
      // If not selected, add it
      dispatch(setBookingData({ selectedKoi: [...selectedKois, koiId] }));
    }
  };

  const handleRemoveKoi = (koiId) => {
    const updatedSelectedKois = selectedKois.filter(id => id !== koiId);
    dispatch(setBookingData({ selectedKoi: updatedSelectedKois }));
  };

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
  useEffect(() => {
    const fetchAllKoi = async () => {
      try {
        const response = await fetchKoiByCustomerIdAPI(customerId);
        setAllKoi(response.data);
      } catch (error) {
        console.error('Error fetching koi list:', error);
      }
    }
    fetchAllKoi();
  }, [customerId, koiUpdateTrigger]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Select Koi for Appointment</h3>

      {/* Existing Koi Table */}
      <Koi
        isBooking={true}
        title={"Your Kois"}
        updateTrigger={koiUpdateTrigger}
        handleAddKoiToBooking={handleAddKoiToBooking}
        selectedKois={selectedKois}
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
          isBooking={true}
          onClose={handleCloseModal}
          onUpdate={handleKoiUpdate}
        />
      </Modal>
    </div>
  );
};

export default InputKoiStep;
