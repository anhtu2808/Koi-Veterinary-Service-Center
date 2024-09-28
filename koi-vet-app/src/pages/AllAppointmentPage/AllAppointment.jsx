import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllAppointment.css";
import { fetchAllAppointmentDetail } from "../../apis";

function AllAppointment() {
  const [appointments, setAppointments] = useState([]);

  //   useEffect(() => {
  //     const fecthServices = async () => {
  //         const response = await fecthAllServicesAPI();
  //         console.log(response)
  //         setServices(response?.data);
  //     }
  //     fecthServices();
  // }, [])

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      const response = await fetchAllAppointmentDetail("VET002");
      setAppointments(response?.data);
    };
    fetchAppointmentDetail();
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-content">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Users Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="rounded-circle"
                width="30"
                height="30"
              />
              Hello, Lekan
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <button className="btn btn-primary" type="button">
              Add user +
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm tableleft">
          <thead>
            <tr>
              <th>Appoint ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                <td>H0001</td>
                <td>David Wagner</td>
                <td>Khám cá nè</td>
                <td>FPT University</td>
                <td>26/09/2024</td>
                <td>
                  <span className="status">Complete</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </td>
              </tr> */}
            {appointments.map((appointmentDetail) => (
              <tr key={appointmentDetail.appointmentId}>
                <td>{appointmentDetail.appointmentId}</td>
                <td>{appointmentDetail.customerId}</td>
                <td>{appointmentDetail.serviceId}</td>
                <td>{appointmentDetail.location}</td>
                <td>{appointmentDetail.appointmentDate}</td>
                <td>{appointmentDetail.status}</td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-trash"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
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
    </main>
  );
}

export default AllAppointment;
