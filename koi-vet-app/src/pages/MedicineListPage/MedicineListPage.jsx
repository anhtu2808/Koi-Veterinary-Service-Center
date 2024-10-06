import { Form, Input, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  deleteMedicineByIdAPI,
  fetchMedicinesAPI,
  updateMedicineByIdAPI,
  createMedicineAPI,
  createPrescriptionAPI,
} from "../../apis";
import "./MedicineListPage.css";
import TextArea from "antd/es/input/TextArea";

function MedicineListPage() {
  const [medicines, setMedicines] = useState([]);
  const [editingData, setEditingData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Trạng thái lưu các dòng đã chọn
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    description: "",
    dosage: "",
    quantity: "",
  });

  const [prescriptionDetails, setPrescriptionDetails] = useState({
    name: "",
    note: "",
  });

  const handlePrescriptionDetailChange = (field, value) => {
    setPrescriptionDetails((prev) => ({ ...prev, [field]: value }));
  };

  // gọi data lên
  useEffect(() => {
    const fetchAllMedicines = async () => {
      const response = await fetchMedicinesAPI();
      setMedicines(response?.data || "");
    };
    fetchAllMedicines();
  }, []);

  // table data
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
      render: (text, record) => (
        <TextArea
          value={
            editingData[record.medicineId]?.name !== undefined
              ? editingData[record.medicineId].name
              : text
          }
          onChange={(e) =>
            handleInputChange(record.medicineId, "name", e.target.value)
          }
          disabled={!editingData[record.medicineId]}
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{
            backgroundColor: "white",
            width: "100%",
            color: "#000000",
          }}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <TextArea
          value={
            editingData[record.medicineId]?.description !== undefined
              ? editingData[record.medicineId].description
              : text
          }
          onChange={(e) =>
            handleInputChange(record.medicineId, "description", e.target.value)
          }
          disabled={!editingData[record.medicineId]}
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{
            backgroundColor: "white",
            width: "100%",
            color: "#000000",
          }}
        />
      ),
    },
    {
      title: "Dosage",
      key: "dosage",
      render: (_, record) => (
        <Input
          value={record.dosage}
          onChange={(e) =>
            handleDirectChange(record.medicineId, "dosage", e.target.value)
          }
        />
      ),
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_, record) => (
        <Input
          value={record.quantity}
          onChange={(e) =>
            handleDirectChange(record.medicineId, "quantity", e.target.value)
          }
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {editingData[record.medicineId] ? (
            <Button onClick={() => handleSave(record.medicineId)}>Save</Button>
          ) : (
            <Button onClick={() => handleEdit(record)}>Edit</Button>
          )}
          <Popconfirm
            title="Are you sure you want to delete this medicine?"
            onConfirm={() => handleDeleteMedicine(record.medicineId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // giá trị nhập dc thay đổi
  const handleInputChange = (medicineId, field, value) => {
    setEditingData((prevData) => ({
      ...prevData,
      [medicineId]: {
        ...prevData[medicineId],
        [field]: value,
      },
    }));
  };

  const handleDirectChange = (medicineId, field, value) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((med) =>
        med.medicineId === medicineId ? { ...med, [field]: value } : med
      )
    );
  };

  // Hàm xử lý khi nhấn nút "Edit"
  const handleEdit = (record) => {
    setEditingData((prevData) => ({
      ...prevData,
      [record.medicineId]: { ...record },
    }));
  };

  // Hàm xử lý khi nhấn nút "Save"
  const handleSave = async (medicineId) => {
    if (editingData[medicineId]) {
      try {
        await updateMedicineByIdAPI(medicineId, editingData[medicineId]);
        setMedicines((prevMedicines) =>
          prevMedicines.map((med) =>
            med.medicineId === medicineId
              ? { ...med, ...editingData[medicineId] }
              : med
          )
        );
        setEditingData((prevData) => {
          const newData = { ...prevData };
          delete newData[medicineId];
          return newData;
        });
      } catch (error) {
        console.error("Failed to update medicine:", error);
      }
    }
  };

  // Cấu hình checkbox cho từng dòng trong bảng
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys); // Cập nhật các dòng đã chọn
    },
    hideSelectAll: true,
  };

  // filter thuốc khi search
  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine &&
      medicine.name &&
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // xóa 1 loại thuốc
  const handleDeleteMedicine = async (medicineId) => {
    await deleteMedicineByIdAPI(medicineId);
    setMedicines((otherMedicines) =>
      otherMedicines.filter((medicine) => medicine.medicineId !== medicineId)
    );
  };

  const handleAddMedicine = () => {
    setIsAdding(true);
  };

  const handleNewMedicineChange = (field, value) => {
    setNewMedicine((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveNewMedicine = async () => {
    try {
      const response = await createMedicineAPI(newMedicine);
      setMedicines([...medicines, response]);
      setNewMedicine({
        name: "",
        description: "",
        dosage: "",
        quantity: "",
      });
      setIsAdding(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to create new medicine:", error);
    }
  };

  const handleCreatePrescription = async () => {
    const appointmentId = "id nhập vô"; // Nhập appointmentId thực tế của bạn
    const selectedMedicines = selectedRowKeys.map((key) => {
      const medicine = medicines.find((med) => med.medicineId === key);
      return {
        medicineId: medicine.medicineId,
        name: medicine.name,
        dosage: editingData[medicine.medicineId]?.dosage || medicine.dosage,
        quantity:
          editingData[medicine.medicineId]?.quantity || medicine.quantity,
      };
    });

    const prescriptionData = {
      medicines: selectedMedicines,
      name: prescriptionDetails.name, // Lấy từ trường nhập liệu
      note: prescriptionDetails.note, // Lấy từ trường nhập liệu
    };

    try {
      const newPrescription = await createPrescriptionAPI(
        appointmentId,
        prescriptionData
      );
      console.log(newPrescription);
      // Bạn có thể thực hiện hành động khác, ví dụ như cập nhật giao diện hoặc thông báo thành công
    } catch (error) {
      console.error("Failed to create prescription:", error);
    }
  };

  return (
    <>
      <Container className="col-12">
        <h2 className="text-center mb-4">Medicine List</h2>

        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <Form>
              <Form.Item
                name={"name"}
                label={"Prescription name"}
                rules={[
                  {
                    required: true,
                    message: "Hey, Bro!!! Maybe you forget somethings",
                  },
                ]}
              >
                <Input
                  value={prescriptionDetails.name}
                  onChange={(e) =>
                    handlePrescriptionDetailChange("name", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                name={"note"}
                label={"Note"}
                rules={[
                  {
                    required: true,
                    message: "Hey, Bro!!! Maybe you forget somethings",
                  },
                ]}
              >
                <Input
                  value={prescriptionDetails.note}
                  onChange={(e) =>
                    handlePrescriptionDetailChange("note", e.target.value)
                  }
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Input
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Table
              rowSelection={rowSelection} // Thêm tính năng checkbox cho các dòng
              tableLayout="fixed"
              dataSource={[
                ...filteredMedicines,
                ...(isAdding ? [medicines] : []),
              ]}
              columns={columns}
              rowKey="medicineId"
              pagination={{ pageSize: 10 }}
              footer={() => (
                <Button onClick={handleAddMedicine} disabled={isAdding}>
                  Add New Medicine
                </Button>
              )}
            />
          </Col>
        </Row>
        {isAdding && (
          <Row>
            <Col md={12}>
              <h3>Add New Medicine</h3>
              <Form layout="vertical">
                {["name", "description"].map((field) => (
                  <Form.Item
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                  >
                    <Input
                      value={newMedicine[field]}
                      onChange={(e) =>
                        handleNewMedicineChange(field, e.target.value)
                      }
                    />
                  </Form.Item>
                ))}
                <Button onClick={handleSaveNewMedicine}>
                  Save New Medicine
                </Button>
              </Form>
            </Col>
          </Row>
        )}
        <Button
          onClick={handleCreatePrescription}
          disabled={selectedRowKeys.length === 0}
        >
          Create Prescription
        </Button>
      </Container>
    </>
  );
}

export default MedicineListPage;
