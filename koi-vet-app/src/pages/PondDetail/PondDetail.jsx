import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PondDetail.css";
import { fetchPondByPondIdAPI, updatePondInformationAPI } from "../../apis";
import { useParams } from "react-router-dom";

const PondDetail = () => {
  const [pondData, setPondData] = useState({
    pondId: "",
    status: "",
    depth: 0,
    perimeter: 0,
    temperature: 0,
    notes: "",
    image: "",
    waterQuality: "",
    filterSystem: "",
    customerId: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { pondId } = useParams();
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

  const handleUpdate = async () => {
    const updatePond = async () => {
      const response = await updatePondInformationAPI(pondId, pondData);
      console.log("Pond updated:", response.data);
      setIsEditing(false);
    }
    updatePond();
  };

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
        disabled={!isEditing}
        required
      />
    </div>
  );

  return (
    <div className="col-9 mx-auto">
      <h3 className="mb-4">Pond Detail</h3>
      <div className="pond-detail-form">
        {renderField("Pond ID", pondData.pondId, "pondId")}
        {renderField("Status", pondData.status, "status")}
        {renderField("Depth (m)", pondData.depth, "depth")}
        {renderField("Perimeter (m)", pondData.perimeter, "perimeter")}
        {renderField("Temperature (°C)", pondData.temperature, "temperature")}
        {renderField("Notes", pondData.notes, "notes")}
        {renderField("Water Quality", pondData.waterQuality, "waterQuality")}
        {renderField("Filter System", pondData.filterSystem, "filterSystem")}
        {renderField("Image URL", pondData.image, "image")}

        {isEditing ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PondDetail;
