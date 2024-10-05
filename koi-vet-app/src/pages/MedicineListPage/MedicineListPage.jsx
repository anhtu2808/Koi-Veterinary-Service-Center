import React, { useEffect, useState } from "react";
import {
  createMedicineAPI,
  deleteMedicineByIdAPI,
  fetchMedicinesAPI,
  updateMedicineByIdAPI,
} from "../../apis";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import "./MedicineListPage.module.css";
import { Input, Modal, Form as AntdForm } from "antd";
import { useForm } from "antd/es/form/Form";
import Loading from "../../components/Loading/Loading";

function MedicineListPage() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const [formVariable] = useForm();
  const [editingMedicine, setEditingMedicine] = useState(null); // Track the medicine being edited

  useEffect(() => {
    const fetchAllMedicines = async () => {
      const response = await fetchMedicinesAPI();
      setMedicines(response?.data || "");
    };
    fetchAllMedicines();
  }, []);

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine &&
      medicine.name &&
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMedicine = async (medicineId) => {
    try {
      await deleteMedicineByIdAPI(medicineId);
      console.log(medicineId);
      setMedicines((otherMedicines) =>
        otherMedicines.filter((medicine) => medicine.medicineId !== medicineId)
      );
    } catch (err) {
      console.error("Lỗi r kìaaaaaaaaaaaaaaaaaaaaaaaaaaa", err);
    }
  };

  const handleAddMedicine = async (values) => {
    const response = await createMedicineAPI(values);
    const newMedicine = response.data;
    if (newMedicine && newMedicine.name) {
      setMedicines((preMedicines) => [...preMedicines, newMedicine]);
    }
    formVariable.resetFields();
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setEditingMedicine(null);
    setVisible(false);
  };

  const handleOk = () => {
    formVariable.submit();
  };

  if (!medicines) {
    return <Loading />;
  }

  const handleUpdateMedicine = async (medicineId, values) => {
    const response = await updateMedicineByIdAPI(medicineId, values);
    setMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.medicineId === medicineId ? response.data : medicine
      )
    );
    handleCloseModal();
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine); // Set the medicine being edited
    formVariable.setFieldsValue({
      name: medicine.name,
      description: medicine.description,
    });
    setVisible(true);
  };

  return (
    <>
      <Container className="col-9">
        <h2 className="text-center mb-4">Medicine List</h2>

        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <InputGroup>
              <InputGroup.Text id="search-addon">
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Button onClick={handleOpenModal}>Add new medicine</Button>
        </Row>

        <Row className="g-4">
          {filteredMedicines.map((medicine) => (
            <Col
              key={medicine.medicineId}
              md={4}
              className="h-100 medicine-col"
            >
              <Card className="h-100 medicine-card">
                <Card.Body>
                  <Card.Title className="medicine-title">
                    {medicine.name}
                  </Card.Title>
                  <Card.Text className="medicine-description">
                    {medicine.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Form.Check
                    type="checkbox"
                    id={`medicine-${medicine.medicineId}`}
                    label="Choose"
                    className="medicine-checkbox"
                  />
                  <Button
                    className="option-item"
                    variant="primary"
                    onClick={() => handleEditMedicine(medicine)} // Open modal for editing
                  >
                    Edit
                  </Button>
                  <Button
                    className="option-item"
                    variant="danger"
                    onClick={() => handleDeleteMedicine(medicine.medicineId)}
                  >
                    x
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal
        title={editingMedicine ? "Edit Medicine" : "Add New Medicine"}
        open={visible}
        onCancel={handleCloseModal}
        onOk={handleOk}
      >
        <AntdForm
          form={formVariable}
          onFinish={
            (values) =>
              editingMedicine
                ? handleUpdateMedicine(editingMedicine.medicineId, values) // Update existing medicine
                : handleAddMedicine(values) // Add new medicine
          }
        >
          <AntdForm.Item
            name={"name"}
            label={"Medicine Name"}
            rules={[
              {
                required: true,
                message: "Hey, Bro!!! Maybe you forget somethings",
              },
            ]}
          >
            <Input />
          </AntdForm.Item>

          <AntdForm.Item
            name={"description"}
            label={"Description"}
            rules={[
              {
                required: true,
                message: "Hey, Bro!!! Maybe you forget somethings",
              },
            ]}
          >
            <Input />
          </AntdForm.Item>
        </AntdForm>
      </Modal>
    </>
  );
}

export default MedicineListPage;
