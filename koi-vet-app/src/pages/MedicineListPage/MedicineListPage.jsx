import React, { useEffect, useState } from "react";
import { fetchMedicinesAPI } from "../../apis";
import { Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import "./MedicineListPage.module.css";

function MedicineListPage() {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllMedicines = async () => {
      const response = await fetchMedicinesAPI();
      setMedicines(response?.data);
    };
    fetchAllMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
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
      </Row>

      <Row className="g-4">
        {filteredMedicines.map((medicine) => (
          <Col key={medicine.medicineId}>
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
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MedicineListPage;
