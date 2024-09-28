import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchServiceByTypeAPI } from "../../apis";

function ServicePageDetail() {
  const { id } = useParams();
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      const response = await fetchServiceByTypeAPI(id);
      setServiceDetails(response.data);
    };
    fetchServiceDetail();
  }, [id]);

  return <></>;
}

export default ServicePageDetail;
