import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    step: 1,
    date: null,
    startAt: null,
    endAt: null,
    serviceId: null,
    vetId: null,
    description: "",
    
  };

const bookingSlice = createSlice({
    name:'booking',
    initialState: initialState,
    reducers:{
       
    }
    
})
export const {} = bookingSlice.actions;
export default bookingSlice.reducer;