//file này để call API tâp trung
import api from "../utils/authorizedAxious"

/* Authentication API*/
export const fetchLoginAPI =   async (username, password) => {
    const response = await api.post('/auth/login', {
        username: username,
        password: password
    })
    return response.data;
}

export const fetchLogoutAPI = async () => {
    const response = await api.post('/auth/logout',{token: localStorage.getItem('accessToken')});
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


//* Vet API */
export const fetchVetsAPI = async () => {
    const response = await api.get('/veterinarians');
    return response.data;
  }

export const fetchVetByVetIdAPI = async (vetId) =>{
    const response = await api.get(`/veterinarians/${vetId}`);
    return response.data;
}

export const fetchVetByVetByServiceIdAPI = async (serviceId) =>{
    const response = await api.get(`/veterinarians?serviceId=${serviceId}`);
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



//Appointment API
export const fetchAllAppointmentAPI = async () => {
    const response = await api.get(`/appointments`);
    return response.data;
}
export const fetchAppointmentByCustomerIdAPI= async (customerId) => {
    const response = await api.get(`/appointments/getByCustomerId?customerId=${customerId}`);
    return response.data;
}

//Pond API
export const  fetchPondByCustomerIdAPI = async (customerId) => {
    const response = await api.get(`/customer/${customerId}/pond`);
    return response.data;
}

export const fetchKoiByPondIdAPI = async (pondId) => {
    const response = await api.get(`/customer/${pondId}/koi`);
    return response.data;
}
export const updatePondInformationAPI = async (pondId, data) => {
    const response = await api.put(`/pond/${pondId}`, data);
    return response.data;
}




//Koi API
export const fetchKoiByKoiIdAPI = async (koiId) => {
    const response = await api.get(`/koi/${koiId}`);
    return response.data;
}
export const fetchKoiByCustomerIdAPI = async (customerId) => {
    const response = await api.get(`/customer/${customerId}/koi`);
    return response.data;
}

export const updateKoiInformationAPI = async (koiId, data) => {
    const response = await api.put(`/koi/${koiId}`, data);
    return response.data;
}


