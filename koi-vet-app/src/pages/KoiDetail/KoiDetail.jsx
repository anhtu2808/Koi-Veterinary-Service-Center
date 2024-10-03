import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createKoiAPI, fetchKoiByKoiIdAPI, updateKoiInformationAPI } from "../../apis";
import { toast } from "react-toastify";
import "./KoiDetail.css";
import { useSelector } from "react-redux";

const fishSpecies = [
  "Kohaku", "Hikari Muji", "Showa Sanshoku", "Shiro Utsuri", "Hi Utsuri",
  "Ki Utsuri", "Asagi", "Shusui", "Tancho", "Goshiki", "Kumonryu",
  "Ochiba Shigure", "Doitsu", "Koromo", "Other"
];

function KoiDetail({ isCreate, isEditable }) {
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [koi, setKoi] = useState({});
  const koiId = useParams().koiId;
  const navigate = useNavigate();
  const customerId = useSelector(state => state.user.customer.customerId);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn không cho form tự động submit

    try {
      if (isCreate) {
        // Tạo mới Koi
        const response = await createKoiAPI({
          breed: selectedSpecies,
          color,
          height,
          weight,
          healthStatus,
          customer_id: customerId,
        });
        toast.success(response.data.message);
      } else if (isEditable) {
        // Cập nhật thông tin Koi
        const response = await updateKoiInformationAPI(koiId, {
          breed: selectedSpecies,
          color,
          height,
          weight,
          healthStatus,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while saving data.");
    } finally {
      setIsEditing(false); // Sau khi lưu, thoát chế độ chỉnh sửa
      navigate(-1); // Quay lại trang trước sau khi lưu
    }
  };

  const handleUpdateButton = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa khi nhấn "Update"
  };

  useEffect(() => {
    if (!isCreate && koiId) {
      const fetchKoiByKoiId = async () => {
        try {
          const response = await fetchKoiByKoiIdAPI(koiId);
          const koiData = response.data || {};
          setKoi(koiData);
          setSelectedSpecies(koiData.breed || "");
          setColor(koiData.color || "");
          setHeight(koiData.height || "");
          setWeight(koiData.weight || "");
          setHealthStatus(koiData.healthStatus || "");
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
                disabled={!isEditing}
              >
                {species}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter color"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            disabled={!isEditing}
          />
        </div>

        <div className="form-group">
          <label>Health Status</label>
          <input
            type="text"
            value={healthStatus}
            onChange={(e) => setHealthStatus(e.target.value)}
            placeholder="Enter health status"
            disabled={!isEditing}
          />
        </div>

        <div className="button-group">
          <button type="button" className="prev-button" onClick={() => navigate(-1)}>
            Back
          </button>

          {
            isEditing ? <button type="submit" className="create-button">
              {isCreate ? "Create" : "Save"}
            </button> : null
          }
          {
            !isEditing ? <button type="button" className="update-button" onClick={handleUpdateButton}>
              Edit
            </button> : null
          }


        </div>
      </form>

    </div>
  );
}

export default KoiDetail;
