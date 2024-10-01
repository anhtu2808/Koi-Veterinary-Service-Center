import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAppointmentByIdAPI, updateAppointmentAPI } from "../../apis/AllAppoimentMockData";
import "./AppointmentDetail.css";

function AppointmentDetail() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({appointmentId: "APT12345",
    customerId: "CUST9876",
    serviceId: "SRV5432",
    location: "Main Clinic",
    appointmentDate: "2023-06-15",
    status: "Confirmed",
    veterinarian: "Dr. Smith"});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      try {
        const response = await fetchAppointmentByIdAPI(appointmentId);
        setAppointment(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };
    fetchAppointmentDetail();
  }, [appointmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };
  console.log(appointment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppointmentAPI(appointmentId, appointment);
      setIsEditing(false);
      // Optionally, show a success message
    } catch (error) {
      console.error("Error updating appointment:", error);
      // Optionally, show an error message
    }
  };

  if (!appointment) return <div>Loading...</div>;

  return (
    <main className="col-md-9 mx-auto col-lg-10 px-md-4 main-content">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Appointment Detail</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="appointmentId" className="form-label">
            Appointment ID
          </label>
          <input
            type="text"
            className="form-control"
            id="appointmentId"
            value={appointment.appointmentId}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="customerId" className="form-label">
            Customer ID
          </label>
          <input
            type="text"
            className="form-control"
            id="customerId"
            name="customerId"
            value={appointment.customerId}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceId" className="form-label">
            Service ID
          </label>
          <input
            type="text"
            className="form-control"
            id="serviceId"
            name="serviceId"
            value={appointment.serviceId}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={appointment.location}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="appointmentDate" className="form-label">
            Appointment Date
          </label>
          <input
            type="date"
            className="form-control"
            id="appointmentDate"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={appointment.status}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Veterinarian
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={appointment.status}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {isEditing && (
          <button type="submit" className="btn btn-success buttonInEdit">
            Save Changes
          </button>
        )}

        {isEditing && (
          <button
            onClick={() => navigate("/admin/inputpondpage")}
            type="submit"
            className="btn btn-success buttonInEdit"
          >
            Pond Information
          </button>
        )}

        {isEditing && (
          <button
            onClick={() => navigate("/admin/inputkoipage")}
            type="submit"
            className="btn btn-success buttonInEdit"
          >
            Koi Information
          </button>
        )}
      </form>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/admin/allappointment")}
      >
        Back to All Appointments
      </button>
    </main>
  );
}

export default AppointmentDetail;
