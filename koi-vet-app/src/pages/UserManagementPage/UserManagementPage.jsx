import React, { useEffect, useState } from "react";
import "./UserManagementPage.css";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import {
  createVetAPI,
  fecthAllServicesAPI,
  fetchAllUsersAPI,
} from "../../apis";
import { ROLE } from "../../utils/constants";
import { Form, Input, message, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Col, Row } from "react-bootstrap";

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [role, setRole] = useState(ROLE.STAFF);
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  console.log(services);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
    form.resetFields();
  }

  function handleOk() {
    form.submit();
  }

  async function handleSubmit(values) {
    try {
      const requestData = {
        ...values,
        service: [values.service],
        userRequest: {
          email: values.email,
          password: values.password,
          username: values.userName,
          fullname: values.fullname,
          address: values.address,
          phone: values.phone,
          status: values.status === "true", // Convert string to boolean
          image: values.image,
        },
      };
      const response = await createVetAPI(requestData);
      message.success("User created successfully!");
      setDataSource([...dataSource, response]);
      handleCloseModal();
    } catch (error) {
      message.error("Failed to create user. Please try again.");
    }
  }
  useEffect(() => {
    const fetchAllServices = async () => {
      const response = await fecthAllServicesAPI();
      setServices(response.data || []);
    };
    fetchAllServices();
  }, []);

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
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleOpenModal}
            >
              Add Vet +
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

        <Modal open={visible} onOk={handleOk} onCancel={handleCloseModal} width={1000}>
          <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit} layout="vertical">
            <Row>
              <Col span={6}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
            </Col>
            
            <Col span={6}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>
            </Row>


            <Row>
            <Col span={6}>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
              <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>
            </Row>

            <Row>
            <Col span={6}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>

              <Col span={6}>
              <Form.Item
              label="Google meet"
              name="google_meet"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
              </Col>
            </Row>

            <Row>
            <Col span={6}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Select>
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
              </Col>
              
              <Col span={6}>
              <Form.Item
              label="Service"
              name="service"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Select>
                {services.map((service) => (
                  <Select.Option
                    key={service.serviceId}
                    value={service.serviceId}
                  >
                    {service.serviceName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
              </Col>
            </Row>




            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            
            
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "pls enter",
                },
              ]}
            >
              <div className="form-group mt-3 text-center">
                <label className="custom-file-upload">
                  <input type="file" onChange={handleUploadImage} />
                  Upload Image <i className="fa-solid fa-image"></i>
                </label>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default UserManagementPage;
