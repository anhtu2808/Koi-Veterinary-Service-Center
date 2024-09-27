import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  step: 0,
  bookingData: {
    serviceId: null,
    vetId: null,
    date: null,
    startAt: null,
    endAt: null,
    userId: null,
    paymentInfo: {},

  },

};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    nextStep: (state) => { 
      state.step += 1
     },
    prevStep: (state) => {
      state.step -= 1;
    }
    ,
    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload }
    },

  }

})
export const { nextStep, prevStep, setBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;