import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  bookingData: {
    type: null,
    serviceFor: null,
    vetId: "SKIP",
    date: null,
    startAt: null,
    endAt: null,
    serviceId: null,
    paymentInfo: {},
    selectedKoi: [],
    selectedPond: [], // Add this line
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
          state.bookingData.vetId = "SKIP";
          break;
        case 3:
          state.bookingData.date = null;
          state.bookingData.startAt = null;
          state.bookingData.endAt = null;
          break;
        default:
          break;

      }
    },
    setStep: (state, action) => {
      state.step = action.payload
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
export const { nextStep, prevStep, setBookingData, resetBoking, setStep } = bookingSlice.actions;
export default bookingSlice.reducer;