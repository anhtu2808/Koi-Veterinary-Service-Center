import React, { useState, useEffect } from "react";
import "./PondDetail.css";
import pond_default from "../../assets/img/pond_default.jpg"
import { fetchPondByPondIdAPI, updatePondInformationAPI, addPondToAppointmentAPI, updatePondTreatmentAPI, createPondAPI } from "../../apis";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PondDetail = ({ isCreate, isUpdate, isBooking, onClose, onUpdate, appointmentId, isVeterinarian, isAppointment, cusId }) => {
  const [pondData, setPondData] = useState({
    pondId: "",
    status: "",
    depth: 0,
    perimeter: 0,
    temperature: 0,
    notes: "",
    image: null,
    waterQuality: "",
    filterSystem: "",
    customerId: cusId,
  });
  const [treatmentData, setTreatmentData] = useState({
    "pondTreatmentId": null,
    "pondId": null,
    "appointmentId": null,
    "healthIssue": null,
    "treatment": null,
    "prescription_id": null
  });
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const treatmentId = searchParams.get('treatmentId');
  const [prescriptions, setPrescriptions] = useState([]);
  const role = useSelector(state => state?.user?.role);
  const { pondId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPondData = async (pondId) => {
      const response = await fetchPondByPondIdAPI(pondId);
      setPondData(response.data);
    };

    fetchPondData(pondId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPondData((prevData) => ({
      ...prevData,
      [name]:
        name === "depth" || name === "perimeter" || name === "temperature"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleAddNewPond = async () => {
    const response = await addPondToAppointmentAPI(appointmentId, pondData);
    if (response.status === 200) {
      onUpdate()
      console.log("Pond added:", response.data);
      setIsEditing(false);
    }

  }
  const handleUpdate = async () => {
    const updatePond = async () => {
      const response = await updatePondInformationAPI(pondId, pondData);
      console.log("Pond updated:", response.data);
      setIsEditing(false);
    }
    updatePond();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAppointment) {
      if (isCreate) {//bác sĩ thêm cá pond vào cuộc hẹn
        const response = await addPondToAppointmentAPI(appointmentId, { ...pondData, customerId: cusId })
        toast.success(response.data.message);
        onUpdate(); // Call the callback function reload list Pond
        onClose();
      }
      if (isUpdate) {   // bác sĩ cập nhật thông tin cá pond
        await updatePondInformationAPI(pondData.pondId, pondData);
        const updateTreatment = await updatePondTreatmentAPI(treatmentData)
        toast.success(updateTreatment.data.message);
        setIsEditing(false);
      }
    } else {
      if (isCreate) {
        const response = await createPondAPI(pondData);
        toast.success(response.data.message);
        onUpdate(); // Call the callback function reload list Pond
        onClose();
      }
      if (isUpdate) {
        setIsEditing(false)
        const response = await updatePondInformationAPI(pondData.pondId, pondData);
        console.log("pondData", pondData)
        toast.success(response.data.message);
      }
    }


  };
  const handleChangeTreatmentData = (name, value) => {
    setTreatmentData({ ...treatmentData, [name]: value === "None" ? null : value });
  }



  const renderField = (label, value, name) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={name === "depth" || name === "perimeter" || name === "temperature"
          ? "number"
          : "text"
        }
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        disabled={!isEditing && !isCreate}
        required
      />
    </div>
  );

  return (
    <div className="col-md-9 mx-auto row">
      <h1 className="mb-4 text-center">Pond Detail</h1>
      <div className="col-md-4 ">
        {renderField("Pond ID", pondData.pondId, "pondId")}
        {renderField("Depth (m)", pondData.depth, "depth")}
        {renderField("Perimeter (m)", pondData.perimeter, "perimeter")}
      </div>
      <div className="col-md-1"> </div>
      <div className="col-md-7 text-center">
        <h5>Hình ảnh hồ cá pond</h5>
        {pondData.image && (
          <img
            src={pond_default}
            alt="Pond"
            className="img-fluid rounded"
          />
        )}
      </div>
      <div className="col-md-4 mt-4">
        {renderField("Filter System", pondData.filterSystem, "filterSystem")}
      </div>
      <div className="col-md-4 mt-4">
        {renderField("Temperature (°C)", pondData.temperature, "temperature")}
      </div>
      <div className="col-md-4 mt-4">
        {renderField("Water Quality", pondData.waterQuality, "waterQuality")}
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
              value={pondData.treatment}
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

      <div className="col-md-12">
        <label htmlFor="notes" className="form-label">Notes</label>
        <textarea className="form-control" id="notes" name="notes" value={pondData.notes} onChange={handleInputChange} disabled={!isEditing && !isCreate}></textarea>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>

        {isCreate && isVeterinarian ? (<button type="button" className="btn btn-primary" onClick={handleAddNewPond} >
          Add to this appointment
        </button>
        ) : null}
        {isUpdate && isVeterinarian && isEditing ? (<button type="button" className="btn btn-primary" onClick={handleUpdate} >
          {isUpdate ? "Update" : "Save Changes"}
        </button>
        ) : null}
        {!isEditing ? (
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        ) : null}
      </div>


    </div>
  );
};

export default PondDetail;
