import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addKoiToAppointmentAPI, createKoiAPI, fetchKoiByKoiIdAPI, updateKoiInformationAPI } from "../../apis";
import { toast } from "react-toastify";
import "./KoiDetail.css";
import { useSelector } from "react-redux";
import { fishSpecies } from "../../utils/constants";



function KoiDetail({ isCreate,cusId, isUpdate,onClose, onUpdate, appointmentId, isAppointment }) {
  const customerId = useSelector(state => state?.user?.customer?.customerId);
  const [koiData, setKoiData] = useState({
    breed: "",
    age: "",
    height: "",
    weight: "",
    healthStatus: "",
    note: "",
    image: "",
  })
  const [isEditing, setIsEditing] = useState(false);

  const koiId = useParams().koiId;
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn không cho form tự động submit

   
      if (isCreate && !isAppointment) { // Customer create new koi
        // Tạo mới Koi
        const response = await createKoiAPI({...koiData, customerId});
        toast.success(response.data.message);
        onUpdate(); // Call the callback function reload list Koi
        onClose(); // Close modal popup
        console.log("koiData", koiData)
      } 
      if (isAppointment) { // veterinarian add koi to appointment
        // veterinarian add koi to appointment
        const response = await addKoiToAppointmentAPI(appointmentId, {...koiData, customerId:cusId})
        console.log("response", response)
        toast.success(response.data.message);
        onUpdate(); // Call the callback function reload list Koi
        onClose();
      } 
      if(isUpdate || isEditing) { // Customer or Veterinarian update koi information
        // Cập nhật thông tin Koi
        const response = await updateKoiInformationAPI(koiId, koiData);
        toast.success(response.data.message);
        setIsEditing(false);
        console.log("koiData", koiData)
      }
   
  };

  const handleUpdateButton = () => {
    setIsEditing(!isEditing); // Bật chế độ chỉnh sửa khi nhấn "Update"
  };

  useEffect(() => {
    if (!isCreate && koiId) {
      const fetchKoiByKoiId = async () => {
        try {
          const response = await fetchKoiByKoiIdAPI(koiId);
          setKoiData(response.data)
        } catch (error) {
          toast.error("Error fetching Koi data.");
        }
      };
      fetchKoiByKoiId();
    }
  }, [koiId, isCreate, customerId]);

  return (
    <div className="col-9 mx-auto">
      <h1>{isCreate ? "Create New Koi" : "Update Koi Information"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Breed:</label>
          <div className="species-grid">
            {fishSpecies.map((species) => (
              <button
                key={species}
                type="button"
                onClick={() => setKoiData({ ...koiData, breed: species })}
                className={`species-button ${koiData.breed === species ? "selected" : ""}`}
                disabled={!isEditing && !isCreate}
              >
                {species}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Age (years)</label>
          <input
            type="number"
            value={koiData.age}
            onChange={(e) => { setKoiData({ ...koiData, age: e.target.value }) }}
            placeholder="Enter age"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            step="0.1"
            value={koiData.height}
            onChange={(e) => setKoiData({ ...koiData, height: e.target.value })}
            placeholder="Enter height"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={koiData.weight}
            onChange={(e) => setKoiData({ ...koiData, weight: e.target.value })}
            placeholder="Enter weight"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Health Status</label>
          <input
            type="text"
            value={koiData.healthStatus}
            onChange={(e) => setKoiData({ ...koiData, healthStatus: e.target.value })}
            placeholder="Enter health status"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={koiData.note}
            onChange={(e) => setKoiData({ ...koiData, note: e.target.value })}
            placeholder="Enter notes"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={koiData.image}
            onChange={(e) => setKoiData({ ...koiData, image: e.target.value })}
            placeholder="Enter image URL"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>

          {isEditing && isUpdate && !isCreate ? (
            <div className=" d-flex gap-2">
              <button type="button" className="btn btn-secondary" onClick={handleUpdateButton}>Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Save
              </button>

            </div>
          ) : isCreate ? <button type="submit" className="btn btn-primary">
            Create
          </button> : null}
          {!isEditing && isUpdate ? (
            <button type="button" className="btn btn-primary" onClick={handleUpdateButton}>
              Update
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default KoiDetail;