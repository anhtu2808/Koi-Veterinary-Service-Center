import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';


const store = configureStore({
    reducer: {
        user: userReducer, // Thêm userReducer vào store
    },
  });


export default store;
