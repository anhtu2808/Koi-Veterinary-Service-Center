import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addKoiToAppointmentAPI, createKoiAPI, fetchKoiByKoiIdAPI, updateKoiInformationAPI } from "../../apis";
import { toast } from "react-toastify";
import "./KoiDetail.css";
import { useSelector } from "react-redux";

const fishSpecies = [
  "Kohaku", "Hikari Muji", "Showa Sanshoku", "Shiro Utsuri", "Hi Utsuri",
  "Ki Utsuri", "Asagi", "Shusui", "Tancho", "Goshiki", "Kumonryu",
  "Ochiba Shigure", "Doitsu", "Koromo", "Other"
];

function KoiDetail({ isCreate, isUpdate, isBooking, onClose, onUpdate,appointmentId,isAppointment }) {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [age, setAge] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("")
  const [isEditing, setIsEditing] = useState(false);
  
  const koiId = useParams().koiId;
  const navigate = useNavigate();
  const customerId = useSelector(state => state?.user?.customer?.customerId);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn không cho form tự động submit

    try {
      if (isCreate && !isEditing && !isAppointment) {
        // Tạo mới Koi
        const response = await createKoiAPI({
          breed: selectedSpecies,
          age,
          // color,
          height,
          weight,
          healthStatus,
          notes,
          image,
          customer_id: customerId,
        });
        toast.success(response.data.message);
        onUpdate(); // Call the callback function
        if(isBooking){
          onClose();
        }else{
          navigate(-1);
        }
      }else if(isAppointment){
        // veterinarian add koi to appointment
        const response = await addKoiToAppointmentAPI(appointmentId,{
          breed: selectedSpecies,
          age,
          height,
          weight,
          healthStatus,
          notes,
          image,
          customer_id: customerId,
        })
        toast.success(response.data.message);
        onUpdate(); // Call the callback function
        onClose();
      } else if (isUpdate || isEditing) {
        // Cập nhật thông tin Koi
        const response = await updateKoiInformationAPI(koiId, {
          breed: selectedSpecies,
          age,
          // color,
          height,
          weight,
          healthStatus,
          notes,
          image,
        });
        toast.success(response.data.message);
        onUpdate(); // Call the callback function
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
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
          const koiData = response.data || {};
          setSelectedSpecies(koiData.breed || "");
          setAge(koiData.age || "");
          // setColor(koiData.color || "");
          setHeight(koiData.height || "");
          setWeight(koiData.weight || "");
          setHealthStatus(koiData.healthStatus || "");
          setNotes(koiData.notes || "");
          setImage(koiData.image || "");
        } catch (error) {
          toast.error("Error fetching Koi data.");
        }
      };
      fetchKoiByKoiId();
    }
  }, [koiId, isCreate]);

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
                onClick={() => setSelectedSpecies(species)}
                className={`species-button ${selectedSpecies === species ? "selected" : ""}`}
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
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            disabled={!isEditing && !isCreate}
          />
        </div>

        {/* <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter color"
            disabled={!isEditing && !isCreate}
          />
        </div> */}

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Health Status</label>
          <input
            type="text"
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
            placeholder="Enter health status"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter notes"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            disabled={!isEditing && !isCreate}
          />
        </div>

        <div className="button-group">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>

          {isEditing && isUpdate  ? (
            <div className=" d-flex gap-2">
            <button type="button" className="btn btn-secondary" onClick={handleUpdateButton}>Cancel</button>
              <button type="submit" className="btn btn-primary">
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