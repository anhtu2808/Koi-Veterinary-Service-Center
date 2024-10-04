import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PondDetail.css";
import { fetchPondByPondIdAPI } from "../../apis";

const PondDetail = ({ pondId, onPondUpdated }) => {
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

  useEffect(() => {
    const fetchPondData = async (pondId) => {
      try {
        const response = await fetchPondByPondIdAPI(pondId);
        setPondData(response.data);
      } catch (error) {
        console.error("Error fetching pond data:", error);
      }
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
    try {
      const response = await axios.put(`/api/ponds/${pondId}`, pondData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Pond updated:", response.data);
      onPondUpdated(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating pond:", error);
    }
  };

  const renderField = (label, value, name) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={
          name === "depth" || name === "perimeter" || name === "temperature"
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
    <div className="col-9">
      <h3 className="mb-4">Pond Detail</h3>
      <div className="pond-detail-form">
        {renderField("Pond ID", pondData.pondId, "pondId")}
        {renderField("Status", pondData.status, "status")}
        {renderField("Depth (m)", pondData.depth, "depth")}
        {renderField("Perimeter (m)", pondData.perimeter, "perimeter")}
        {renderField("Temperature (°C)", pondData.temperature, "temperature")}
        {renderField("Notes", pondData.notes, "notes")}
        {renderField("Image URL", pondData.image, "image")}
        {renderField("Water Quality", pondData.waterQuality, "waterQuality")}
        {renderField("Filter System", pondData.filterSystem, "filterSystem")}
        {renderField("Customer ID", pondData.customerId, "customerId")}

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
