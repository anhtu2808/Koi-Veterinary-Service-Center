import { Form, Input, message, Popconfirm, Table, AutoComplete } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  fetchMedicinesAPI,
  createMedicineAPI,
  updateMedicineByIdAPI,
  deleteMedicineByIdAPI,
  createPrescriptionAPI,
} from "../../apis";
import "./MedicineListPage.css";

function MedicineListPage({ appointmentId, onPrescriptionCreated }) {
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableMedicines, setAvailableMedicines] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    medicineId: "",
    name: "",
    description: "",
    dosage: "",
    quantity: "",
  });
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    name: "",
    note: "",
  });

  useEffect(() => {
    // Fetch all medicines for search suggestion
    const fetchAllMedicines = async () => {
      const response = await fetchMedicinesAPI();
      setAvailableMedicines(response.data || []);
    };
    fetchAllMedicines();
  }, []);

  // Add new medicine row with empty fields
  const handleAddNewMedicine = () => {
    setIsAdding(true);
    setNewMedicine({
      medicineId: "",
      name: "",
      description: "",
      dosage: "",
      quantity: "",
    });
  };

  // Handle searching for medicines by name
  const handleSearchMedicine = (value) => {
    setSearchTerm(value);
    // Filter available medicines based on search term
    const filteredMedicines = availableMedicines.filter(
      (medicine) =>
        medicine.name && // Ensure name is not null or undefined
        medicine.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMedicines(filteredMedicines); // Set the filtered list for suggestions
  };

  // Handle selecting a medicine from the suggestions
  const handleSelectMedicine = (value) => {
    const selectedMedicine = availableMedicines.find(
      (medicine) => medicine.medicineId === value
    );
    setNewMedicine((prev) => ({
      ...prev,
      medicineId: selectedMedicine.medicineId, // Keep medicineId for later usage
      name: selectedMedicine.name, // Display name in the input field
      description: selectedMedicine.description,
    }));
  };

  // Handle dosage and quantity input changes
  const handleInputChange = (field, value) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  // Add the selected medicine to the list of medicines
  const handleDone = () => {
    if (newMedicine.medicineId && newMedicine.dosage && newMedicine.quantity) {
      setSelectedMedicines([...selectedMedicines, { ...newMedicine }]);
      setIsAdding(false);
      setNewMedicine({
        medicineId: "",
        name: "",
        description: "",
        dosage: "",
        quantity: "",
      });
    } else {
      message.error("Please fill in all fields.");
    }
  };

  // // Handle deleting a medicine from the list
  // const handleDeleteMedicine = (medicineId) => {
  //   setSelectedMedicines((prev) =>
  //     prev.filter((medicine) => medicine.medicineId !== medicineId)
  //   );
  // };

  // Handle editing a medicine's dosage or quantity
  const handleEditMedicine = (medicineId, field, value) => {
    setSelectedMedicines((prev) =>
      prev.map((medicine) =>
        medicine.medicineId === medicineId
          ? { ...medicine, [field]: value }
          : medicine
      )
    );
  };

  // Create prescription
  const handleCreatePrescription = async () => {
    if (selectedMedicines.length === 0 || !prescriptionDetails.name) {
      message.error("Please complete the prescription form.");
      return;
    }

    const prescriptionData = {
      name: prescriptionDetails.name,
      note: prescriptionDetails.note,
      appointmentId: appointmentId,
      createdDate: new Date(),
      prescriptionMedicines: selectedMedicines.map((medicine) => ({
        medicineId: medicine.medicineId,
        dosage: medicine.dosage,
        quantity: medicine.quantity,
      })),
    };

    try {
      await createPrescriptionAPI(prescriptionData);
      message.success("Prescription created successfully.");
      // Reset state after creation
      setSelectedMedicines([]);
      setPrescriptionDetails({ name: "", note: "" });
      onPrescriptionCreated();
    } catch (error) {
      message.error("Failed to create prescription.");
    }
  };

  // Columns for the medicine table
  const columns = [
    {
      title: "Medicine ID",
      dataIndex: "medicineId",
      key: "medicineId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (text, record) => (
        <Input
          value={record.dosage}
          onChange={(e) =>
            handleEditMedicine(record.medicineId, "dosage", e.target.value)
          }
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Input
          value={record.quantity}
          onChange={(e) =>
            handleEditMedicine(record.medicineId, "quantity", e.target.value)
          }
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this medicine?"
          // onConfirm={() => handleDeleteMedicine(record.medicineId)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Container>
      <h2 className="text-center mb-4">Prescription Form</h2>
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Form>
            <Form.Item label="Prescription Name" required>
              <Input
                value={prescriptionDetails.name}
                onChange={(e) =>
                  setPrescriptionDetails({
                    ...prescriptionDetails,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Note">
              <Input
                value={prescriptionDetails.note}
                onChange={(e) =>
                  setPrescriptionDetails({
                    ...prescriptionDetails,
                    note: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* Add new medicine button */}
      <Button onClick={handleAddNewMedicine} disabled={isAdding}>
        Add New Medicine
      </Button>

      {/* If adding a new medicine */}
      {isAdding && (
        <Row className="mt-4">
          <Col md={12}>
            <AutoComplete
              options={filteredMedicines.map((med) => ({
                value: med.medicineId, // Use medicineId as the value to select (this is for internal tracking)
                label: med.name, // Display medicine name in the dropdown
              }))}
              onSearch={handleSearchMedicine}
              onSelect={handleSelectMedicine}
              placeholder="Search and select medicine"
              value={newMedicine.name} // Set the selected name as the value to display in the input
              onChange={(value) => {
                // Cập nhật trạng thái khi người dùng nhập hoặc xóa
                setNewMedicine((prev) => ({ ...prev, name: value }));
              }}
              allowClear // Thêm thuộc tính để cho phép xóa nhanh bằng nút xóa
              style={{ width: "100%", marginBottom: "16px" }}
            />
            <Input
              placeholder="Dosage"
              value={newMedicine.dosage}
              onChange={(e) => handleInputChange("dosage", e.target.value)}
              style={{ marginBottom: "16px" }}
            />
            <Input
              placeholder="Quantity"
              value={newMedicine.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
            <Button onClick={handleDone}>Done</Button>
          </Col>
        </Row>
      )}

      {/* Medicines table */}
      <Table
        columns={columns}
        dataSource={selectedMedicines}
        rowKey="medicineId"
        pagination={false}
      />

      {/* Create prescription button */}
      <Button
        onClick={handleCreatePrescription}
        disabled={selectedMedicines.length === 0}
        className="mt-4"
      >
        Create Prescription
      </Button>
    </Container>
  );
}

export default MedicineListPage;
