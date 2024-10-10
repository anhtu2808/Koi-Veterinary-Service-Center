import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  deletePrescriptionAPI,
  fetchPrescriptionByIdAPI,
  updatePrescriptionAPI,
} from "../../apis";

function PrescriptionDetail(props) {
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [editingMedicines, setEditingMedicines] = useState({});

  useEffect(() => {
    const handlefetchPrescriptionId = async () => {
      const response = await fetchPrescriptionByIdAPI(props.prescriptionId);
      setPrescriptionData(response?.data.prescriptionMedicines || "");
    };
    handlefetchPrescriptionId();
  }, [props.prescriptionId]);

  const handleEdit = (medicineId) => {
    setEditingMedicines((prev) => ({
      ...prev,
      [medicineId]: {
        editing: true,
        ...prescriptionData.find((m) => m.medicineId === medicineId),
      },
    }));
  };

  const handleSave = async (medicineId) => {
    const updatedMedicine = editingMedicines[medicineId];
    const newPrescriptionData = prescriptionData.map((medicine) =>
      medicine.medicineId === medicineId
        ? {
            ...medicine,
            dosage: updatedMedicine.dosage,
            quantity: updatedMedicine.quantity,
          }
        : medicine
    );
    setPrescriptionData(newPrescriptionData);
    setEditingMedicines((prev) => ({
      ...prev,
      [medicineId]: { editing: false },
    }));

    // Call the update API here with the updated medicine details
    await updatePrescriptionAPI(props.prescriptionId, {
      name: prescriptionData.name,
      note: prescriptionData.note,
      appointmentId: prescriptionData.appointmentId,
      prescriptionMedicines: newPrescriptionData,
    });
  };

  const handleChange = (medicineId, field, value) => {
    setEditingMedicines((prev) => ({
      ...prev,
      [medicineId]: {
        ...prev[medicineId],
        [field]: value,
      },
    }));
  };

  const columns = [
    {
      title: "Medicine ID",
      dataIndex: "medicineId",
      key: "medicineId",
    },
    {
      title: "Medicine Name",
      dataIndex: "medicineName",
      key: "medicineName",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (text, record) => {
        const isEditing = editingMedicines[record.medicineId]?.editing;
        return isEditing ? (
          <input
            type="text"
            value={editingMedicines[record.medicineId]?.dosage}
            onChange={(e) =>
              handleChange(record.medicineId, "dosage", e.target.value)
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        const isEditing = editingMedicines[record.medicineId]?.editing;
        return isEditing ? (
          <input
            type="number"
            value={editingMedicines[record.medicineId]?.quantity}
            onChange={(e) =>
              handleChange(record.medicineId, "quantity", e.target.value)
            }
          />
        ) : (
          text
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        const isEditing = editingMedicines[record.medicineId]?.editing;
        return isEditing ? (
          <Button onClick={() => handleSave(record.medicineId)}>Save</Button>
        ) : (
          <Button onClick={() => handleEdit(record.medicineId)}>Edit</Button>
        );
      },
    },
    {
      title: "Delete",
      key: "delete",
      render: (text, record) => {
        return (
          <Button
            onClick={() =>
              handleDeletePrescriptionMedicine(record.prescriptionMedicineId)
            }
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const handleDeletePrescriptionMedicine = async (prescriptionMedicineId) => {
    await deletePrescriptionAPI(prescriptionMedicineId);
    setPrescriptionData((prev) =>
      prev.filter(
        (medicine) => medicine.prescriptionMedicineId !== prescriptionMedicineId
      )
    );
  };

  return (
    <div className="container text-center">
      <Container>
        <Row>
          <Col md={12}>
            <h2>Detail Prescription</h2>
            <Table
              dataSource={prescriptionData}
              columns={columns}
              rowKey="medicineId"
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrescriptionDetail;
