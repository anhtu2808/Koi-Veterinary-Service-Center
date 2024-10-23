import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader/AdminHeader'
import { deleteFAQAPI, fetchAllFAQAPI, updateFAQAPI } from '../../apis'
import PreLoader from '../../components/Preloader/Preloader'
import { toast } from 'react-toastify'
import { Modal } from 'antd'

function FAQManagement() {
    const [faqs, setFaqs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedFAQ, setSelectedFAQ] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleUpdateFAQ = async () => {
        const response = await updateFAQAPI(selectedFAQ.faqId, selectedFAQ)
        if (response.status === 200) {
            toast.success("FAQ updated successfully")
        }
    }
    const handleDeleteFAQ = async () => {
        Modal.confirm({
            title: "Are you sure you want to delete this FAQ?",
            onOk: async () => {
                const response = await deleteFAQAPI(selectedFAQ.faqId)
                if (response.status === 200) {
                    toast.success("FAQ deleted successfully")
                    fetchAllFAQ()
                }
            }
            
        })
    }
    const fetchAllFAQ = async () => {
        const response = await fetchAllFAQAPI()
        setFaqs(response.data)
        setIsLoading(false)
    }
    useEffect(() => {
        fetchAllFAQ()
    }, [])
    if (isLoading) return <PreLoader />
    return (
        <div>
            <AdminHeader title="FAQ Management" />
            <div className='container'>
                <div className='row'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faqs.map((faq) => (
                                <tr key={faq.faqId}>
                                    <td>{faq.question}</td>
                                    <td>{faq.answer}</td>
                                    <td className='d-flex gap-2'>
                                        <button className='btn btn-primary'>Edit</button>
                                        <button className='btn btn-danger' onClick={() => handleDeleteFAQ(faq.faqId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FAQManagement
