import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import { fecthAllServicesAPI, updateServiceAPI } from '../../apis';
import ServiceForm from '../../components/ServiceForm/ServiceForm';
import { Modal } from 'antd';
import { toast } from 'react-toastify';

const ServiceManagementPage = () => {
  const [services, setServices] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    const response = await fecthAllServicesAPI();
    setServices(response.data);
  }
  const updateService = async (serviceId, data) => {
    const response = await updateServiceAPI(serviceId, data);
    setServices(response.data);
  }
  const handleOkEdit = async () => {
    console.log(selectedService)
    const res = await updateServiceAPI(selectedService?.serviceId, selectedService);
    if (res.status === 200) {
      fetchServices()
    } else {
      toast.error(res.message)
    }
    setShowUpdateModal(false);
  }
  const handleEdit = (service) => {
    setSelectedService(service);
    setShowUpdateModal(true);
  }
  const handleCancelEdit = () => {
    setShowUpdateModal(false);
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
                    <tr key={service?.serviceId}>
                      <td>{service?.serviceName}</td>
                      <td>{service?.serviceFor}</td>
                      <td>{service?.basePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{service?.koiPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{service?.pondPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td className='d-flex gap-2'>
                        <button className='btn btn-primary'>View</button>
                        <button className='btn btn-primary' onClick={() => handleEdit(service)}>Edit</button>
                        <button className='btn btn-danger'>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <Modal 
              open={showUpdateModal} 
              onCancel={handleCancelEdit} 
              onOk={handleOkEdit}
              title="Edit Service" 
              width={1000} // Adjust the width as needed
            >
              <ServiceForm selectedService={selectedService} setSelectedService={setSelectedService} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceManagementPage
