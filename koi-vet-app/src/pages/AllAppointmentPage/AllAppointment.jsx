import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllAppointment.css";
import {
  fetchAllAppointmentAPI,
  fetchAllAppointmentByVetIdAPI,
  fetchAppointmentByCustomerIdAPI,
} from "../../apis";
import { ROLE } from "../../utils/constants";
import { useSelector } from "react-redux";

function AllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const customerId = useSelector((state) => state?.user?.customer?.customerId);
  const [title, setTitle] = useState("");

  //   useEffect(() => {
  //     const fecthServices = async () => {
  //         const response = await fecthAllServicesAPI();
  //         console.log(response)
  //         setServices(response?.data);
  //     }
  //     fecthServices();
  // }, [])

  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    const fetchAppointmentForVet = async (vetId) => {
      const response = await fetchAllAppointmentByVetIdAPI(vetId);
      setAppointments(response?.data);
      console.log(response?.data)
    };

    const fetchAppointmentForStaff = async () => {
      const response = await fetchAllAppointmentAPI();
      setAppointments(response?.data);
    };

    const fetchAppointmentForCustomer = async (customerId) => {
      const response = await fetchAppointmentByCustomerIdAPI(customerId);
      setAppointments(response?.data);
      setTitle("My Appointments");
    };

    if (role === ROLE.VETERINARIAN) {
      fetchAppointmentForVet("VET002");
      setTitle("All My Appointments");
    } else if (role === ROLE.STAFF) {
      fetchAppointmentForStaff();
      setTitle("All Veterinarian Appointments");
    } else if (role === ROLE.CUSTOMER) {
      fetchAppointmentForCustomer(customerId);
    }
  }, [role, customerId]);

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

      <div className="table-responsive">
        <table className="table table-striped table-sm tableleft">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Time</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
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
                      to={`/appointment/${appointmentDetail.appointmentId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    :
                    <Link
                      to={`/admin/appointment/${appointmentDetail.appointmentId}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                  }

                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-trash"></i>
                  </button>
                  {role === ROLE.STAFF && (
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-user-md"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <Link className="page-link" href="#" tabindex="-1">
              Items per page: 10
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              1-4 of 15
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              <i className="fas fa-chevron-left"></i>
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#">
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>

  );
}

export default AllAppointment;
