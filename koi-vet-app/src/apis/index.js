//file này để call API tâp trung
import api from "../utils/authorizedAxious"
import axios from "axios";

/* Authentication API*/
export const fetchLoginAPI = async (username, password) => {
    const response = await api.post('/auth/login', {
        username: username,
        password: password
    })
    return response.data;
}

export const fetchLogoutAPI = async () => {
    const response = await api.post('/auth/logout', { token: localStorage.getItem('accessToken') });
    return response.data;
}


/* User API */
export const createUserAPI = async (email, password, username, fullname, phone, address) => {

    const response = await api.post('/users/register', {
        email,
        password,
        username,
        fullname,
        phone,
        address,
    });
    return response.data;
};

export const fetchMyInfoAPI = async () => {
    const response = await api.post('/users/myInfo');
    return response.data
}

export const updateMyInfoAPI = async (userData) => {
    const response = await api.put('/users/updateMyInfo', userData);
    return response.data;
};

//* Vet API */
export const fetchVetsAPI = async () => {
    const response = await api.get('/veterinarians');
    return response.data;
}

export const fetchVetByVetIdAPI = async (vetId) => {
    const response = await api.get(`/veterinarians/${vetId}`);
    return response.data;
}

export const fetchVetByServiceIdAPI = async (serviceId) => {
    const response = await api.get(`veterinarians/getByServiceId?serviceId=${serviceId}`);
    return response.data;
}
export const fetchVetForAssignAPI = async (appointmentData) => {
    console.log("appointmentData", appointmentData)
    const response = await api.get(`/vetSchedules/getVeterinariansByDateTime?type=${appointmentData.type}&serviceId=${appointmentData.serviceId}&date=${appointmentData.date}&startTime=${appointmentData.startTime}&endTime=${appointmentData.endTime}`);
    return response.data;
}




// Vet API for Service
export const fecthAllServicesAPI = async () => {
    const response = await api.get('/services');
    return response.data;
}

export const fecthServiceByServiceIdAPI = async (serviceId) => {
    const response = await api.get(`/services/${serviceId}`);
    return response.data;
}
export const fetchServiceByTypeAPI = async (type) => {
    const response = await api.get(`/services/appointmentType/${type}`);
    return response.data;
}


// Appointment API
export const createAppointmentAPI = async (appointmentCreateRequest) => {
    const response = await api.post('/appointments', appointmentCreateRequest);
    return response.data;
}

export const fetchAllAppointmentAPI = async (status, offSet, pageSize) => {
    const response = await api.get(`appointments?status=${status}&offSet=${offSet}&pageSize=${pageSize}`);
    return response.data;
}
export const fetchAppointmentByCustomerIdAPI = async (customerId, status) => {
    const response = await api.get(`/customers/${customerId}/appointments?status=${status}`);
    return response.data;
}

export const fetchAppointmentByIdAPI = async (appointmentId) => {
    const response = await api.get(`appointments/${appointmentId}`);
    return response.data;
}

export const updateAppointmentAPI = async (appointmentData, appointmentId) => {
    const response = await api.put(`/appointments/update`, { ...appointmentData, appointmentId });
    return response.data;
}
export const fetchAllAppointmentByVetIdAPI = async (vetId, status) => {
    const response = await api.get(`/veterinarians/${vetId}/appointments?status=${status}`);
    return response.data;
}

export const addKoiToAppointmentAPI = async (appointmentId, koiData) => {
    const saveKoi = await createKoiAPI(koiData)

    const response = await api.post(`/treatments/kois`, { koiId: saveKoi.data.koiId, appointmentId: appointmentId });
    return response.data;
}
export const addPondToAppointmentAPI = async (appointmentId, pondData) => {
    const savePond = await createPondAPI(pondData)

    const response = await api.post(`/treatments/ponds`, { pondId: savePond.data.pondId, appointmentId: appointmentId });
    return response.data;
}
//API Schedule
export const fetchScheduleByAppimentTypeAPI = async (type, vetId) => {
    const response = await api.get(`vetSchedules?type=${type}&vetId=${vetId}`);
    return response.data;
}







//Pond API
export const fetchPondsByCustomerIdAPI = async (customerId) => {
    const response = await api.get(`/customers/${customerId}/ponds`);
    return response.data;
}

export const fetchPondByPondIdAPI = async (pondId) => {
    const response = await api.get(`/ponds/${pondId}`);
    return response.data;
}
export const updatePondInformationAPI = async (pondId, data) => {
    const response = await api.put(`/ponds/${pondId}`, data);
    return response.data;
}
export const createPondAPI = async (data) => {
    const response = await api.post('/ponds', data);
    return response.data;
}


export const fetchPondsByAppointmentIdAPI = async (appointmentId) => {
    const response = await api.get(`/appointments/${appointmentId}/ponds/`);
    return response.data;
}



//Koi API
export const fetchKoiByKoiIdAPI = async (koiId) => {
    const response = await api.get(`/kois/${koiId}`);
    return response.data;
}
export const fetchKoisByCustomerIdAPI = async (customerId) => {
    const response = await api.get(`/customers/${customerId}/kois`);
    return response.data;
}

export const updateKoiInformationAPI = async (koiId, koiData,image) => {
    const imageURL = await fetchUpLoadImageAPI(image);
    const response = await api.put(`/kois/${koiId}`, {...koiData,image:imageURL});
    return response.data;
}
export const createKoiAPI = async (data) => {
    const response = await api.post('/kois', data);
    return response.data;
}

export const fetchKoisByAppointmentIdAPI = async (appointmentId) => {
    const response = await api.get(`/appointments/${appointmentId}/kois/`);
    return response.data;
}










// Medicine API
export const fecthMedicineByIdAPI = async (medicineId) => {
    const response = await api.get(`/medicines/${medicineId}`)
    return response.data;
}

export const fetchMedicinesAPI = async () => {
    const response = await api.get('/medicines')
    return response.data;
}


export const deleteMedicineByIdAPI = async (medicineId) => {
    const response = await api.delete(`/medicines/${medicineId}`)
    return response.data;
}

export const updateMedicineByIdAPI = async (medicineId, data) => {
    const response = await api.put(`/medicines/${medicineId}`, data)
    return response.data;
}

export const createMedicineAPI = async (data) => {
    const response = await api.post(`/medicines`, data)
    return response.data;
}



//Prescription API
export const createPrescriptionAPI = async (data) => {
    const response = await api.post(`/prescriptions`, data);
    return response.data;
}

export const fetchPrescriptionByIdAPI = async (prescriptionId) => {
    const response = await api.get(`/prescriptions/${prescriptionId}`)
    return response.data;
}

export const updatePrescriptionAPI = async (prescriptionId, data) => {
    const response = await api.put(`/prescriptions/${prescriptionId}`, data)
    return response.data;
}

export const deletePrescriptionAPI = async (prescriptionId, medicineId) => {
    const response = await api.delete(
        `/prescriptions/deletePrescriptionMedicineId`,
        { params: { prescriptionId, medicineId } }
    );
    return response.data;
};

//Treatment API
export const updateKoiTreatmentAPI = async (updatedData) => {
    const response = await api.put(`/treatments/updateKoiTreatment`, updatedData)
    return response.data;
}
export const updatePondTreatmentAPI = async (updatedData) => {
    const response = await api.put(`/treatments/updatePondTreatment`, updatedData)
    return response.data;
}
export const fetchKoiTreatmentByIdAPI = async (koiTreatmentId) => {
    const response = await api.get(`/treatments/kois/${koiTreatmentId}`)
    return response.data;
}
export const fetchPondTreatmentByIdAPI = async (pondTreatmentId) => {
    const response = await api.get(`/treatments/ponds/${pondTreatmentId}`)
    return response.data;
}

export const fetchTreatmentByIdAPI = async (id) => {
    const response = await api.get(`/treatments/${id}`)
    return response.data;
}

//prescription API
export const fetchPrescriptionByAppointmentIdAPI = async (appointmentId) => {
    const response = await api.get(`/prescriptions?appointmentId=${appointmentId}`)
    return response.data;
}

//Payment API
export const fetchRedirectPaymentAPI = async (amount, bankCode, appointmentData) => {
    const response = await api.post(`payment/vn-pay?amount=${amount}&bankCode=${bankCode}`, appointmentData)
    return response.data;
}

export const fetchSecondInfoPaymentAPI = async (appointmentId) => {
    const response = await api.get(`treatments/secondPayment?appointmentId=${appointmentId}`)
    return response.data;
}

//Upload Image API
export const fetchUpLoadImageAPI = async (image) => {
    const response = await api.get(`images/presigned-url?imageName=${image.name}`);
    const presignedUrl = await response.data; // URL file trên S3 (bỏ query params)
    await axios.put(presignedUrl, image, {
        headers: {
            'Content-Type': image.type,
        },
    });
    const imageURL = presignedUrl.split("?")[0];
    console.log("imageURL", imageURL)
    return imageURL;
}


// User API
export const fetchAllUsersAPI = async (role) => {
    const response = await api.get(`/users/get?role=${role}`);
    return response.data;
}

// Invoice API
export const updateInvoiceAPI = async (invoiceId, data) => {
    const response = await api.put(`/invoices/update/${invoiceId}`, data);
    return response.data;
}

//Rating
export const fetchAllRatingByServiceIdAPI = async (serviceId) => {
    const response = await api.get(`/feedbacks/${serviceId}`);
    return response.data;
}

export const createRatingAPI = async (appointmentId, data) => {
    const response = await api.post(`/feedbacks/${appointmentId}`, data);
    return response.data;
}



// News API
export const fetchAllNewsAPI = async () => {
    const response = await api.get('/news');
    return response.data;
}

export const fetchNewsByIdAPI = async (id) => {
    const response = await api.get(`/news/id?id=${id}`);
    return response.data;
}

export const createNewsAPI = async (data) => {
    const response = await api.post('/news', data);
    return response.data;
}

export const updateNewsAPI = async (newId, data) => {
    const response = await api.put(`/news/update?newId=${newId}`, data);
    return response.data;
}


