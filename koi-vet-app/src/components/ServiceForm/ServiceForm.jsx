import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ServiceForm = ({ selectedService, setSelectedService, setSelectedImage, selectedImage }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedService({ ...selectedService, [name]: value });
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    }
    return (
        <div >
            <form>
                <div className='mb-3'>
                    <label htmlFor='serviceName' className='form-label'>Service Name</label>
                    <input name='serviceName' type='text' className='form-control' id='serviceName' value={selectedService?.serviceName} onChange={handleChange} />
                    <div className='mb-3 d-flex flex-column'>
                        <label htmlFor='image' className='form-label'>Image</label>
                        <img className='img-fluid' src={selectedImage ? URL.createObjectURL(selectedImage) : selectedService?.image} alt={selectedService?.serviceName} />
                        <input type='file' className='form-control' id='image' onChange={handleImageChange} />
                    </div>
                    <label htmlFor='serviceFor' className='form-label'>Service For</label>
                    <select name='serviceFor' className='form-select' id='serviceFor' value={selectedService?.serviceFor} onChange={handleChange}>
                        <option value='KOI'>Koi</option>
                        <option value='POND'>Pond</option>
                        <option value='ONLINE'>Online</option>
                    </select>
                    <label htmlFor='basePrice' className='form-label'>Base Price</label>
                    <input name='basePrice' type='number' className='form-control' id='basePrice' value={selectedService?.basePrice} onChange={handleChange} />
                    {
                        selectedService?.serviceFor === 'KOI' && (
                            <>
                                <label htmlFor='koiPrice' className='form-label'>Koi Price</label>
                                <input name='koiPrice' type='number' className='form-control' id='koiPrice' value={selectedService?.koiPrice} onChange={handleChange} />
                            </>
                        )
                    }
                    {
                        selectedService?.serviceFor === 'POND' && (
                            <>
                                <label htmlFor='pondPrice' className='form-label'>Pond Price</label>
                                <input name='pondPrice' type='number' className='form-control' id='pondPrice' value={selectedService?.pondPrice} onChange={handleChange} />
                            </>
                        )
                    }
                    <label htmlFor='description' className='form-label'>Description</label>
                    <ReactQuill
                        name='description'

                        id='description'
                        value={selectedService?.description}
                        onChange={(value) => setSelectedService({ ...selectedService, description: value })}
                    />
                </div>
            </form>
        </div>
    )
}

export default ServiceForm
