import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  step: 0,
  bookingData: {
    serviceId: null,
    vetId: "skip",
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
      switch (state.step) {
        case 0:
          break;
        case 1:
          state.bookingData.serviceId = null;
          break;
        case 2:
          state.bookingData.vetId = "skip";
          break;
        case 3:
          state.bookingData.date = null;
          break;
        default:
          break;

      }
    },
    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload }
    },
    resetBoking: (state) => {
      state.step = 0;
      state.bookingData = initialState.bookingData;
    }

  }

})
export const { nextStep, prevStep, setBookingData, resetBoking } = bookingSlice.actions;
export default bookingSlice.reducer;