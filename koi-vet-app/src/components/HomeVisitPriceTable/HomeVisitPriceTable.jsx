import React, { useEffect, useState } from 'react';
import './HomeVisitPriceTable.css'; // Import CSS cho component
import { fetchHomeVisitPriceAPI } from '../../apis';

const HomeVisitPriceTable = () => {
  // Dữ liệu mẫu (thay thế bằng dữ liệu thực từ API)
  const [homeVisitPrice, setHomeVisitPrice] = useState([]);

  useEffect(() => {
    const fetchHomeVisitPrice = async () => {
      const response = await fetchHomeVisitPriceAPI();
      setHomeVisitPrice(response.data);
    };
    fetchHomeVisitPrice();
  }, []);
  return (
    <div className="delivery-pricing-table">
      <h1 className="delivery-pricing-title">Home Visit Pricing Table</h1>
      <table className="delivery-pricing-table-content">
        <thead>
          <tr>
            <th>ID</th>
            <th>From (km)</th>
            <th>To (km)</th>
            <th>Price (VND/km)</th>
          </tr>
        </thead>
        <tbody>
          {homeVisitPrice.map((delivery, index) => (
            <tr key={index}>
              <td>{index +1}</td>
              <td>{delivery.fromPlace}</td>
              <td>{delivery.toPlace}</td>
              <td>{delivery.price.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeVisitPriceTable;
