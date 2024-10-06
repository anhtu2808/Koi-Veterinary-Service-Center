import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAppointmentByIdAPI, fetchVetForAssignAPI, updateAppointmentAPI } from "../../apis";
import "./AppointmentDetail.css";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { APPOINTMENT_STATUS, ROLE } from "../../utils/constants";
import { useSelector } from "react-redux";

function AppointmentDetail() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  // const [dataForFindVet, setDataForFindVet] = useState({
  //   appointmentId: "APT12345",
  //   appointmentDate: "2023-06-15",
  // });  
  const [vetList, setVetList] = useState([]);
  const [appointment, setAppointment] = useState({
    "appointmentId": null,
    "appointmentDate": null,
    "createdAt": null,
    "depositedMoney": null,
    "endTime": null,
    "location": null,
    "result": null,
    "startTime": null,
    "status": null,
    "type": null,
    "customerId": null,
    "customerName": null,
    "serviceId": null,
    "serviceName": null,
    "vetId": null
  });
  const [isEditing, setIsEditing] = useState(false);
  const role = useSelector((state) => state.user.role);
  useEffect(() => {
    const fetchAppointmentDetail = async (appointmentId) => {
      try {
        const response = await fetchAppointmentByIdAPI(appointmentId);
        setAppointment(response.data);

        // Chỉ gọi fetchVetForAssignAPI sau khi có dữ liệu từ fetchAppointmentByIdAPI

      } catch (error) {
        console.error("Error fetching appointment details:", error);
        // Xử lý lỗi ở đây (ví dụ: hiển thị thông báo lỗi)
      }
    };


    fetchAppointmentDetail(appointmentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId]);

  useEffect(() => {
    const fetchVetList = async () => {

      const responseVet = await fetchVetForAssignAPI({
        type: appointment.type,
        serviceId: appointment.serviceId,
        date: appointment.appointmentDate,
        startTime: appointment.startTime,
        endTime: appointment.endTime
      });
      setVetList(responseVet.data);
    }
    if (appointment.type && appointment.serviceId && appointment.appointmentDate && appointment.startTime && appointment.endTime) {
      fetchVetList();
    }
  }, [appointment.type,
  appointment.serviceId,
  appointment.appointmentDate,
  appointment.startTime,
  appointment.endTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAppointmentAPI(appointment, appointmentId);
      setIsEditing(false);
      // Optionally, show a success message
    } catch (error) {
      console.error("Error updating appointment:", error);
      // Optionally, show an error message
    }
  };

  if (!appointment) return <div>Loading...</div>;

  return (
    <>
      <AdminHeader title="Appointment Detail" />

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
            Customer
          </label>
          <input
            type="text"
            className="form-control"
            id="customerId"
            name="customerId"
            value={appointment.customerName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceId" className="form-label">
            Service
          </label>
          <input
            type="text"
            className="form-control"
            id="serviceId"
            name="serviceId"
            value={appointment.serviceName}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceId" className="form-label">
            Start Time
          </label>
          <input type="time" className="form-control" id="startTime" name="startTime" value={appointment.startTime} onChange={handleInputChange} disabled={!isEditing}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="serviceId" className="form-label">
            End Time
          </label>
          <input type="time" className="form-control" id="endTime" name="endTime" value={appointment.endTime} onChange={handleInputChange} disabled={!isEditing}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input type="text" className="form-control" id="location" name="location" value={appointment.location} onChange={handleInputChange} disabled={!isEditing} />
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

            <option value={APPOINTMENT_STATUS.CREATED}>Waiting Confirm</option>
            <option value={APPOINTMENT_STATUS.BOOKING_COMPLETE}>Veterinarian Assigned</option>
            <option value={APPOINTMENT_STATUS.PROCESS}>Process</option>
            <option value={APPOINTMENT_STATUS.READY_FOR_PAYMENT}>Ready For Payment</option>
            <option value={APPOINTMENT_STATUS.FINISH}>Completed</option>
            <option value={APPOINTMENT_STATUS.CANCEL}>Cancelled</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="vetId" className="form-label">
            Veterinarian
          </label>
          <select
            className="form-select"
            id="vetId"
            name="vetId"
            value={appointment.vetId}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Not assigned</option>
            {vetList.map((vet) => (
              <option key={vet.vetId} value={vet.vetId}>
                {vet.user.fullName}
              </option>
            ))}
          </select>
        </div>

        {isEditing && (
          <button type="submit" className="btn btn-success buttonInEdit">
            Save Changes
          </button>
        )}


        <button
          onClick={() => navigate("/admin/inputpondpage")}
          type="submit"
          className="btn btn-success buttonInEdit"
        >
          Pond Information
        </button>

        <button
          onClick={() => navigate(`/admin/koi-treatment/${appointment.appointmentId}?customerId=${appointment.customerId}`)}
          type="submit"
          className="btn btn-success buttonInEdit"
        >
          Koi Information
        </button>

      </form>
      <div className="col-md-12">
        <button
          className="btn btn-secondary "
          onClick={() => navigate(-1)}
        >
          Back to All Appointments
        </button>
        {role !== ROLE.CUSTOMER && (
          <button
            className="btn btn-primary mx-3"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
      </div>


    </>

  );
}

export default AppointmentDetail;
