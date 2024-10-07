import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { fetchPrescriptionByIdAPI } from "../../apis";

function PrescriptionDetail(props) {
  const [prescriptionData, setPrescriptionData] = useState([]);

  useEffect(() => {
    const handlefetchPrescriptionId = async () => {
      const response = await fetchPrescriptionByIdAPI(props.prescriptionId);
      setPrescriptionData(response?.data.prescriptionMedicines || "");
    };
    handlefetchPrescriptionId();
  }, [props.prescriptionId]);

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
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

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
