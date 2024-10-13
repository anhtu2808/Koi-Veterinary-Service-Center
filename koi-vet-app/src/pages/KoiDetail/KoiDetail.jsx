import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addKoiToAppointmentAPI, createKoiAPI, fetchKoiByKoiIdAPI, fetchPrescriptionByAppointmentIdAPI, fetchTreatmentByIdAPI, updateKoiInformationAPI, updateKoiTreatmentAPI } from "../../apis";
import { toast } from "react-toastify";
import "./KoiDetail.css";
import { fishSpecies } from "../../utils/constants";
import { useSelector } from "react-redux";



function KoiDetail({ isCreate, cusId, isUpdate, onClose, onUpdate, isAppointment, customerId }) {
  const [koiData, setKoiData] = useState({
    breed: "",
    age: "",
    length: "",
    weight: "",
    healthStatus: "",
    note: "",
    image: null,
    koiId: null,
    customerId: customerId
  })
  const [treatmentData, setTreatmentData] = useState({
    "koiTreatmentId": null,
    "koiId": null,
    "appointmentId": null,
    "healthIssue": null,
    "treatment": null,
    "prescription_id": null
  });
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const treatmentId = searchParams.get('treatmentId');
  const [image, setImage] = useState(null);
  const appointmentId = searchParams.get('appointmentId');
  const role = useSelector(state => state.user.role);
  const [prescriptions, setPrescriptions] = useState([]);
  const { koiId } = useParams();
  const navigate = useNavigate();
  const handleChangeTreatmentData = (name, value) => {
    setTreatmentData({ ...treatmentData, [name]: value === "None" ? null : value });
  }
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAppointment) {
      if (isCreate) {//bác sĩ thêm cá koi vào cuộc hẹn
        const response = await addKoiToAppointmentAPI(appointmentId, { ...koiData, customerId: cusId })
        toast.success(response.data.message);
        onUpdate(); // Call the callback function reload list Koi
        onClose();
      }
      if (isUpdate) {   // bác sĩ cập nhật thông tin cá koi
        await updateKoiInformationAPI(koiData.koiId, koiData, image);
        const updateTreatment = await updateKoiTreatmentAPI(treatmentData)
        toast.success(updateTreatment.data.message);
        setIsEditing(false);
      }
    } else {
      if (isCreate) {
        const response = await createKoiAPI(koiData);
        toast.success(response.data.message);
        onUpdate(); // Call the callback function reload list Koi
        onClose();
      }
      if (isUpdate) {
        setIsEditing(false)
        const response = await updateKoiInformationAPI(koiData.koiId, koiData, image);
        console.log("koiData", koiData)
        toast.success(response.data.message);
      }
    }


  };

  const handleUpdateButton = () => {
    setIsEditing(!isEditing); // Bật chế độ chỉnh sửa khi nhấn "Update"
  };
  const fetchPrescriptions = async () => {
    const response = await fetchPrescriptionByAppointmentIdAPI(appointmentId)
    setPrescriptions(response.data)
  }
  const fetchTreatment = async () => {
    const response = await fetchTreatmentByIdAPI(treatmentId);
    setTreatmentData({ ...treatmentData, ...response.data })
    setKoiData(response.data.koi)
  }
  const fetchKoiByKoiId = async () => {
    const response = await fetchKoiByKoiIdAPI(koiId);
    setKoiData(response.data)
  };
  useEffect(() => {
    if (isAppointment) {
      fetchTreatment(); // lấy dữ liệu treatment
      fetchPrescriptions(); // lấy dữ liệu đơn thuốc
    } else {
      fetchKoiByKoiId();
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
            <img className="w-100 koi-profile-image rounded-3" src={image ? URL.createObjectURL(image) : koiData.image} alt="Koi" />
            {isEditing && ( // Only show the upload input if isEditing is true
              <div className="form-group mt-3 text-center">
                <label className="custom-file-upload">
                  <input
                    type="file" 
                    onChange={handleUploadImage}
                    disabled={!isEditing}
                  />
                  Upload Image <i className="fa-solid fa-image"></i>
                </label>
              </div>
            )}
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
            <label>Length (cm)</label>
            <input
              type="number"
              step="0.1"
              value={koiData.length}
              onChange={(e) => setKoiData({ ...koiData, length: e.target.value })}
              placeholder="Enter length"
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

        {isAppointment ?
          <div className="gap-6 row">
            <div className="form-group col-md-6">
              <label>Health Issue</label>
              <textarea
                name="healthIssue"
                value={treatmentData.healthIssue}
                onChange={(e) => handleChangeTreatmentData(e.target.name, e.target.value)}
                placeholder="Enter treatment"
                disabled={!isEditing && !isCreate}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Treatment</label>
              <textarea
                value={koiData.treatment}
                name="treatment"
                onChange={(e) => handleChangeTreatmentData(e.target.name, e.target.value)}
                placeholder="Enter treatment"
                disabled={(!isEditing && !isCreate) || role === "CUSTOMER"}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Prescription</label>
              <select
                className="form-select"
                value={treatmentData.prescription_id || "None"}
                name="prescription_id"
                onChange={(e) => handleChangeTreatmentData(e.target.name, e.target.value)}
                disabled={(!isEditing && !isCreate) || role === "CUSTOMER"}
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
