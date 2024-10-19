import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import { fecthAllServicesAPI } from '../../apis';

const ServiceManagementPage = () => {
  const [services, setServices] = useState([]);


  const fetchServices = async () => {
    const response = await fecthAllServicesAPI();
    setServices(response.data);
  }
  useEffect(() => {
    fetchServices();
  }, []);


  return (
    <div>
      <AdminHeader title="Service Management" />
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Base Price</th>
                  <th>Koi Price</th>
                  <th>Pond Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  services.map((service) => (
                    <tr key={service.serviceId}>
                      <td>{service.serviceName}</td>
                      <td>{service.serviceFor}</td>
                      <td>{service.basePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{service.koiPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td>{service.pondPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        <td className='d-flex gap-2'>
                        <button className='btn btn-primary'>View</button>
                        <button className='btn btn-primary'>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceManagementPage
