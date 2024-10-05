import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllAppointment.css";
import {
  fetchAllAppointmentAPI,
  fetchAllAppointmentByVetIdAPI,
  fetchAppointmentByCustomerIdAPI,
} from "../../apis";
import { ROLE, APPOINTMENT_STATUS } from "../../utils/constants";
import { useSelector } from "react-redux";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

function AllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("ALL");
  const customerId = useSelector((state) => state?.user?.customer?.customerId);
  const [title, setTitle] = useState("All Appointments");
  const vetId = useSelector((state) => state?.user?.veterinarian?.vetId);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    const fetchAppointmentForVet = async (vetId, status) => {
      const response = await fetchAllAppointmentByVetIdAPI(vetId, status);
      setAppointments(response?.data);
      console.log(response?.data)
    };

    const fetchAppointmentForStaff = async () => {
      const response = await fetchAllAppointmentAPI(status);
      setAppointments(response?.data);
    };

    const fetchAppointmentForCustomer = async (customerId) => {
      const response = await fetchAppointmentByCustomerIdAPI(customerId, status);
      setAppointments(response?.data);
      setTitle("My Appointments");
    };
    if (role === ROLE.VETERINARIAN) {
      fetchAppointmentForVet(vetId, status);
      setTitle("All My Appointments");
    } else if (role === ROLE.STAFF) {
      fetchAppointmentForStaff();
      setTitle("All Veterinarian Appointments");
    } else if (role === ROLE.CUSTOMER) {
      fetchAppointmentForCustomer(customerId, status);
      setTitle("My Appointments");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, customerId, status]);

  const handleChangeStatus = (status) => {
    setStatus(status);
    console.log("status", status)
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };
  return (
    <>

      <AdminHeader title={title} />

      <div className="row mb-3 justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <button className="btn btn-primary" type="button">
              Search <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row mb-3 justify-content-center">
        <nav className="w-100">
          <div class="nav nav-tabs " id="nav-tab" role="tablist">
            <button class="nav-link active custom-text-color" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => handleChangeStatus("ALL")}>
              <i className="fas fa-list-ul me-2"></i>All
            </button>
            <button class="nav-link custom-text-color" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.CREATED)}>
            <i class="fa-solid fa-hourglass-start "></i> Waiting Confirm
            </button>
            <button class="nav-link custom-text-color" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.BOOKING_COMPLETE)}>
              <i className="fas fa-check-circle me-2 text-success"></i>Veterinarian Assigned
            </button>
            <button class="nav-link custom-text-color" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.PROCESS)}>
              <i className="fas fa-spinner me-2"></i>Process
            </button>
            <button class="nav-link custom-text-color" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.READY_FOR_PAYMENT)}>
              <i className="fas fa-dollar-sign me-2 text-warning"></i>Ready For Payment
            </button>
            <button class="nav-link custom-text-color" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.FINISH)}>
              <i className="fas fa-flag-checkered me-2 text-success"></i>Finish
            </button>
            <button class="nav-link custom-text-color" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" onClick={() => handleChangeStatus(APPOINTMENT_STATUS.CANCEL)}>
              <i className="fas fa-ban me-2 text-danger"></i>Cancel
            </button>
          </div>
        </nav>


      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm tableleft">
          <thead>
            <tr>
              <th>ID</th> <th>User</th> <th>Service</th> <th>Time</th><th>Date</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointmentDetail, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appointmentDetail.customerName}</td>
                <td>{appointmentDetail.serviceName}</td>
                <td>{formatTime(appointmentDetail.startTime)}</td>
                <td>{formatDate(appointmentDetail.appointmentDate)}</td>
                <td>{appointmentDetail.status}</td>
                <td>
                  {role === ROLE.CUSTOMER ?
                    <Link
                      to={`/profile/appointment/${appointmentDetail.appointmentId}`}
                      className="btn btn-sm btn-outline-dark"
                    >
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    :
                    <Link
                      to={`/admin/appointment/${appointmentDetail.appointmentId}`}
                      className="btn btn-sm btn-outline-dark"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  }
                  {role === ROLE.STAFF && (
                    <button className="btn btn-sm btn-outline-dark">
                      <i className="fas fa-user-md"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  );
}

export default AllAppointment;
