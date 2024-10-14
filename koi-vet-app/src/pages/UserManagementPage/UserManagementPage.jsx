import React, { useEffect, useState } from "react";
import "./UserManagementPage.css";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { fetchAllUsersAPI } from "../../apis";
import { ROLE } from "../../utils/constants";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(ROLE.STAFF);

  useEffect(() => {
    const fetchAllUsersByRole = async () => {
      const response = await fetchAllUsersAPI(role);
      setUsers(response.data || []);
    };
    fetchAllUsersByRole();
  }, [role]);

  return (
    <>
      <AdminHeader title="User Management" />
      <div className="row mb-3 justify-content-center">
        <div className="col-md-8">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <button className="btn btn-primary" type="button">
              Add user +
            </button>
          </div>
        </div>
      </div>
      <nav className="w-100">
        <div className="nav nav-tabs " id="nav-tab" role="tablist">
          <button
            className="nav-link custom-text-color"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
            onClick={() => setRole(ROLE.STAFF)}
          >
            <i className="fas fa-user-tie me-2 text-primary"></i>Staff
          </button>
          <button
            className="nav-link custom-text-color"
            id="nav-disabled-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-disabled"
            type="button"
            role="tab"
            aria-controls="nav-disabled"
            aria-selected="false"
            onClick={() => setRole(ROLE.CUSTOMER)}
          >
            <i className="fas fa-user me-2 text-success"></i>Customer
          </button>
          <button
            className="nav-link custom-text-color"
            id="nav-disabled-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-disabled"
            type="button"
            role="tab"
            aria-controls="nav-disabled"
            aria-selected="false"
            onClick={() => setRole(ROLE.VETERINARIAN)}
          >
            <i className="fas fa-user-md me-2 text-info"></i>Veterinarian
          </button>
        </div>
      </nav>
      <div className="table-responsive">
        <table className="table table-striped table-sm tableleft">
          <colgroup>
            <col style={{ width: "10%" }} /> {/* Image */}
            <col style={{ width: "15%" }} /> {/* Username */}
            <col style={{ width: "15%" }} /> {/* Fullname */}
            <col style={{ width: "20%" }} /> {/* Email */}
            <col style={{ width: "10%" }} /> {/* Phone */}
            {(role === ROLE.CUSTOMER || role === ROLE.STAFF) && (
              <col style={{ width: "20%" }} />
            )}
            <col style={{ width: "10%" }} /> {/* Action */}
          </colgroup>
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              {(role === ROLE.CUSTOMER || role === ROLE.STAFF) && (
                <th>Address</th>
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>
                    <img src={user.image} alt="User" className="img-fluid" />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    {role === ROLE.CUSTOMER
                      ? user.customer?.phone
                      : role === ROLE.VETERINARIAN
                      ? user.veterinarian?.phone
                      : user.staff?.phone}
                  </td>
                  {(role === ROLE.CUSTOMER || role === ROLE.STAFF) && (
                    <td>{user.customer?.address || user.staff?.address}</td>
                  )}
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
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found for the selected role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserManagementPage;
