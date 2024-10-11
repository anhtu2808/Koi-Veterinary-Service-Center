import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addKoiToAppointmentAPI, createKoiAPI, fetchKoiByKoiIdAPI, fetchPrescriptionByAppointmentIdAPI, fetchTreatmentByIdAPI, updateKoiInformationAPI, updateKoiTreatmentAPI } from "../../apis";
import { toast } from "react-toastify";
import "./KoiDetail.css";
import { fishSpecies } from "../../utils/constants";



function KoiDetail({ isCreate, cusId, isUpdate, onClose, onUpdate, isAppointment, customerId }) {
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const treatmentId = searchParams.get('treatmentId');

  const [treatmentData, setTreatmentData] = useState({
    "koiTreatmentId": null,
    "koiId": null,
    "appointmentId": null,
    "healthIssue": null,
    "treatment": null,
    "prescription_id": null
  });
  const [prescriptions, setPrescriptions] = useState([]);
  const { appointmentId, koiId } = useParams();
  const navigate = useNavigate();
  const handleChangeTreatmentData = (e) => {
    setTreatmentData({ ...treatmentData, [e.target.name]: e.target.value })
  }
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
    if (isAppointment && isCreate) { // veterinarian add koi to appointment
      // veterinarian add koi to appointment
      const response = await addKoiToAppointmentAPI(appointmentId, { ...koiData, customerId: cusId })
      console.log("response", response)
      toast.success(response.data.message);
      onUpdate(); // Call the callback function reload list Koi
      onClose();
    }
    if (isUpdate && isAppointment) { // Customer or Veterinarian update koi information
      // Cập nhật thông tin Koi
      const response = await updateKoiInformationAPI(treatmentData.koi.koiId, koiData);
      const updateTreatment = await updateKoiTreatmentAPI(treatmentData)
      toast.success(response.data.message);
      toast.success(updateTreatment.data.message);
      setIsEditing(false);
      console.log("koiData", koiData)
    }

  };

  const handleUpdateButton = () => {
    setIsEditing(!isEditing); // Bật chế độ chỉnh sửa khi nhấn "Update"
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const response = await fetchPrescriptionByAppointmentIdAPI(appointmentId)
      setPrescriptions(response.data)
    }
    if (!isCreate && koiId && !isAppointment) {
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
    if (isAppointment) {
      const fetchTreatment = async () => {
        const response = await fetchTreatmentByIdAPI(treatmentId);
        setTreatmentData({ ...treatmentData, ...response.data })
        setKoiData(response.data.koi)
      }
      fetchTreatment();
      fetchPrescriptions();
    }
  }, [koiId, isCreate, customerId, appointmentId, treatmentId]);

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

        {isAppointment && !isCreate ?
          <div className="gap-6 row">
            <div className="form-group col-md-6">
              <label>Health Issue</label>
              <textarea
                name="healthIssue"
                value={koiData.healthIssue}
                onChange={handleChangeTreatmentData}
                placeholder="Enter treatment"
                disabled={!isEditing && !isCreate}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Treatment</label>
              <textarea
                value={koiData.treatment}
                name="treatment"
                onChange={handleChangeTreatmentData}
                placeholder="Enter treatment"
                disabled={!isEditing && !isCreate}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Prescription</label>
              <select
                className="form-select"
                value={treatmentData.prescription_id || "None"}
                name="prescription_id"
                onChange={handleChangeTreatmentData}
                disabled={!isEditing && !isCreate}
              >
                <option value="None">None</option>
                {prescriptions.map(prescription => (
                  <option key={prescription.id} value={prescription.id}>
                    {prescription.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-6 d-flex align-items-end gap-3 justify-content-end">
              <button type="button" className="btn btn-primary">Add Prescription</button>
              <button type="button" className="btn btn-primary">View Prescriptions</button>
            </div>
          </div>
          : null}

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
          {isCreate && isAppointment ?
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Back
            </button>
            :
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back
            </button>
          }


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