//file này để call API tâp trung
import api from "../utils/authorizedAxious"

/* Authentication API*/
export const fetchLoginAPI =   async (username, password) => {
    const response = await api.post('/auth/login', {
        username: username,
        password: password
    })
    return response.data.data;
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
      return response.data.data;
    
  };