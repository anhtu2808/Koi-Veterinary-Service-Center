import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fecthServiceByServiceIdAPI } from "../../apis";
import "./ServicePageDetail.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";

function ServicePageDetail() {
  const { serviceId } = useParams();
  console.log(serviceId);

  const [serviceDetail, setServiceDetail] = useState(null);

  const fectchServiceDetail = async () => {
    const response = await fecthServiceByServiceIdAPI(serviceId);
    setServiceDetail(response.data);
  };

  useEffect(() => {
    fectchServiceDetail();
  }, [serviceId]);

  if (!serviceDetail) {
    return <Loading />;
  }

  const getPrice = () => {
    if (serviceDetail.serviceFor === "FISH") {
      return (
        <p>
          Price: <span>{serviceDetail.koiPrice}$ </span>
        </p>
      );
    } else if (serviceDetail.serviceFor === "POND") {
      return <p>Price: {serviceDetail.pondPrice}$ </p>;
    } else {
      return <p>Price: {serviceDetail.basePrice}$ </p>;
    }
  };

  return (
    <Container fluid className="service-detail">
      <Row className="service-hero">
        <Col>
          <Card className="bg-dark text-white">
            <Card.Img
              src="https://cafishvet.com/wp-content/uploads/2024/09/Ultrasound-Jessie-Sanders-Fish-Vetranarian-2048x1366.jpg"
              alt="Service"
              className="service-image"
            />
            <Card.ImgOverlay className="d-flex flex-column justify-content-end">
              <Card.Title className="service-title display-4">
                {serviceDetail.serviceName}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>

      <Container className="service-content py-5">
        <Row>
          <Col md={8} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Service Description</Card.Title>
                <Card.Text>{serviceDetail.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center">
              <Card.Header className="bg-primary text-white">
                Price Information
              </Card.Header>
              <Card.Body>
                {getPrice()}
                <p>
                  Service Type:{" "}
                  <span className="font-weight-bold">
                    {serviceDetail.serviceFor}
                  </span>
                </p>
              </Card.Body>
              <Card.Footer>
                <Button variant="success" className="w-100">
                  Booking Now
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ServicePageDetail;
