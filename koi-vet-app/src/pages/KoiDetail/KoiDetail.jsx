import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addKoiToAppointmentAPI, createKoiAPI, fetchKoiByKoiIdAPI, updateKoiInformationAPI } from "../../apis";
import { toast } from "react-toastify";
import "./KoiDetail.css";
import { fishSpecies } from "../../utils/constants";



function KoiDetail({ isCreate, cusId, isUpdate, onClose, onUpdate, appointmentId, isAppointment, customerId }) {
  const [koiData, setKoiData] = useState({
    breed: "",
    age: "",
    height: "",
    weight: "",
    healthStatus: "",
    note: "",
    image: "",
    customerId: customerId
  })
  const [isEditing, setIsEditing] = useState(false);

  const koiId = useParams().koiId;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn không cho form tự động submit


    if (isCreate && !isAppointment) { // Customer create new koi
      // Tạo mới Koi
      const response = await createKoiAPI(koiData);
      toast.success(response.data.message);
      onUpdate(); // Call the callback function reload list Koi
      onClose(); // Close modal popup
      console.log("koiData", koiData)
    }
    if (isAppointment) { // veterinarian add koi to appointment
      // veterinarian add koi to appointment
      const response = await addKoiToAppointmentAPI(appointmentId, { ...koiData, customerId: cusId })
      console.log("response", response)
      toast.success(response.data.message);
      onUpdate(); // Call the callback function reload list Koi
      onClose();
    }
    if (isUpdate || isEditing) { // Customer or Veterinarian update koi information
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
        <div className="col-12-md row my-5">
          <div className="form-group col-md-5">
            <label>Breed:</label>
            <select
              className="form-select"
              value={koiData.breed}
              onChange={(e) => setKoiData({ ...koiData, breed: e.target.value })}
              disabled={!isEditing && !isCreate}
            >
              <option value="" disabled>Select breed</option>
              {fishSpecies.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
            <div className="form-group mt-3">
              <label>Notes</label>
              <textarea
                value={koiData.note}
                onChange={(e) => setKoiData({ ...koiData, note: e.target.value })}
                placeholder="Enter notes"
                disabled={!isEditing && !isCreate}
              />
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <img className="w-100 rounded-3" src="https://bizweb.dktcdn.net/100/307/111/files/ca-koi-tancho-5ff10c55-deb0-4b26-ae3c-5c27d8cf8c89.jpg?v=1533735289075" alt="Koi" />
          </div>
        </div>
        <div className="form-group d-flex justify-content-between gap-3">
          <div>
            <label>Age (years)</label>
            <input
              type="number"
              value={koiData.age}
              onChange={(e) => { setKoiData({ ...koiData, age: e.target.value }) }}
              placeholder="Enter age"
              disabled={!isEditing && !isCreate}
            />
          </div>
          <div>
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
          <div>
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