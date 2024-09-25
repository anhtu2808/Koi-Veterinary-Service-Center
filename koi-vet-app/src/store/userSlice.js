import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  customerId: null,
  veterinarianId: null,
  address: '',
  phone: '',
  image: '',
  username: '',
  fullname: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state, action) => { // Đổ dữ liệu user vào state
      return { ...state, ...action.payload };
    },
    
    updateUser: (state, action) => { // Cập nhật thông tin user
      const { key, value } = action.payload;
      state[key] = value;
    },
    
    clearUser: () => initialState, // Reset user về giá trị ban đầu
  },
});


export const { setUser, updateUser, clearUser } = userSlice.actions;

// Export reducer để sử dụng trong store
export default userSlice.reducer;
