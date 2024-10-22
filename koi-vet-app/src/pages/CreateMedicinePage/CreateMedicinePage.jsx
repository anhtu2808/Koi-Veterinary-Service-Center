import { Form, Input, message, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { createMedicineAPI, fetchMedicinesAPI } from '../../apis';

import './CreateMedicinePage.css';


function CreateMedicinePage() {
    const { TextArea } = Input;
    const [newMedicineData, setNewMedicineData] = useState({
        name: "",
        description: "",
        medUnit: "",
      });
      const [availableMedicines, setAvailableMedicines] = useState([]);
    //   const [isCreating, setIsCreating] = useState(false);

    //   const handleOpenCreateMedicineForm = () => {
    //     setIsCreating(true);
    //   };
    
      const handleCloseCreateMedicineForm = () => {
        // setIsCreating(false);
        setNewMedicineData({ name: "", description: "", medUnit: "" });
      };

  // Xử lý thay đổi dữ liệu trong form
  const handleNewMedicineInputChange = (field, value) => {
    setNewMedicineData((prev) => ({ ...prev, [field]: value }));
  };

  // Gọi API để tạo thuốc mới
  const handleCreateMedicine = async () => {
    const { name, description, medUnit } = newMedicineData;

    if (!name || !description || !medUnit) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      await createMedicineAPI(newMedicineData); // Gọi API để tạo thuốc
      message.success("Medicine created successfully.");

      // Cập nhật lại danh sách thuốc
      const updatedMedicines = await fetchMedicinesAPI();
      setAvailableMedicines(updatedMedicines.data || []);

      handleCloseCreateMedicineForm(); // Đóng form sau khi tạo thành công
    } catch (error) {
      message.error("Failed to create medicine.");
    }
  };

  useEffect(() => {
  const fetchMedicines = async () => {
      const response = await fetchMedicinesAPI();
      setAvailableMedicines(response.data || []);
    };
    fetchMedicines();
  }, []);

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
      title: "Unit",
      dataIndex: "medUnit",
      key: "medUnit",
    },
    
  ];
  return (
    <>
    <div style={{ overflow: 'hidden' }}>

    <Table dataSource={availableMedicines} columns={columns} 
        pagination={{
        pageSize: 4, // 10 thuốc trên mỗi trang
        showSizeChanger: false, // Ẩn tùy chọn thay đổi số lượng trên mỗi trang
      }} />
      </div>

<Container className="card p-4" style={{borderRadius: '10px', width: '70%'}}>
        <Row className="mt-4">
          <Col md={12}>
            <Form>
              <Form.Item label="Medicine Name" required>
                <Input
                  placeholder="Enter medicine name"
                  value={newMedicineData.name}
                  onChange={(e) =>
                    handleNewMedicineInputChange("name", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Description" required style={{marginBottom: '30px'}}>
                <TextArea
                  style={{height: '100px', overflow: 'auto'}}
                  placeholder="Enter description"
                  value={newMedicineData.description}
                  onChange={(e) =>
                    handleNewMedicineInputChange("description", e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item label="Unit" required>
                <Select
                  placeholder="Select unit"
                  value={newMedicineData.medUnit}
                  onChange={(value) =>
                    handleNewMedicineInputChange("medUnit", value)
                  }
                  style={{ width: "100%" }}
                >
                  <Select.Option value="PACKAGE">PACKAGE</Select.Option>
                  <Select.Option value="PILL">PILL</Select.Option>
                  <Select.Option value="BOTTLE">BOTTLE</Select.Option>
                </Select>
              </Form.Item>

              <div style={{ display: "flex", gap: "8px" }}>
                <Button onClick={handleCreateMedicine} type="primary">
                  Create Medicine
                </Button>
                
              </div>
            </Form>
            </Col>
            </Row>
       </Container>
    </>
  )
}

export default CreateMedicinePage