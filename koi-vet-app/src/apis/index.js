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
    const response = await api.get(`/services?type${type}`);
    return response.data;
} 