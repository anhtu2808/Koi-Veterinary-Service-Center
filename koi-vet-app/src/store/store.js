import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';


const store = configureStore({
    reducer: {
        user: userReducer, // Thêm userReducer vào store
        booking: bookingReducer,
    },
  });


export default store;
