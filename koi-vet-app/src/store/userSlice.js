import { createAsyncThunk, createSlice ,} from '@reduxjs/toolkit';

// Async action to fetch user profile data
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async () => {
  const response = await fetchUserProfile(); // Assuming you have an API to fetch the user profile
  return response;
});
const initialState = {
  isAuthorized: !!localStorage.getItem('token'), // Kiểm tra xem user đã đăng nhập chưa
  user: {},       
  loading: false,
  error: null,
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