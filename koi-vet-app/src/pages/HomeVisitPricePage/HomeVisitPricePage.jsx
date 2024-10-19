import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import HomeVisitPriceTable from '../../components/HomeVisitPriceTable/HomeVisitPriceTable'
import { fetchHomeVisitPriceAPI } from '../../apis'
import { Modal, Button } from 'antd'

const HomeVisitPricePage = () => {
    const [homeVisitPrice, setHomeVisitPrice] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedDelivery, setSelectedDelivery] = useState(null)  

    useEffect(() => {
        fetchHomeVisitPrice()
    }, [])
    const fetchHomeVisitPrice = async () => {
        const res = await fetchHomeVisitPriceAPI()
        setHomeVisitPrice(res.data)
    }

    const showModal = (delivery) => {
        setSelectedDelivery(delivery)
        setIsModalVisible(true)
    }

    const handleOk = () => {
        // Handle the save logic here

        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleDelete = (delivery) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this delivery?',
            onOk: () => {
                // Handle the delete logic here
                console.log('Deleted:', delivery);
            },
        });
    }

    return (
        <div>
            <AdminHeader title="Home Visit Price" />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <table className="delivery-pricing-table-content">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>From (km)</th>
                                    <th>To (km)</th>
                                    <th>Price (VND/km)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {homeVisitPrice.map((delivery, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{delivery.fromPlace}</td>
                                        <td>{delivery.toPlace}</td>
                                        <td>{delivery.price.toLocaleString()}</td>
                                        <td className='d-flex gap-2'>
                                            <button className="btn btn-primary" onClick={() => showModal(delivery)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(delivery)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal title="Edit Delivery Price" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {/* Add form fields here to edit the selected delivery */}
                <label>From (km)</label>
                <input type="number" value={selectedDelivery?.fromPlace} onChange={(e) => setSelectedDelivery({ ...selectedDelivery, fromPlace: e.target.value })} />
                <label>To (km)</label>
                <input type="number" value={selectedDelivery?.toPlace} onChange={(e) => setSelectedDelivery({ ...selectedDelivery, toPlace: e.target.value })} />
                <label>Price (VND/km)</label>
                <input type="number" value={selectedDelivery?.price} onChange={(e) => setSelectedDelivery({ ...selectedDelivery, price: e.target.value })} />
            </Modal>
        </div>
    )
}

export default HomeVisitPricePage
