// addressSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  delivery_fee: 0,
  delivery_option_id: null,
  delivery_option_name: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressInfo: (state, action) => {
      state.delivery_option_name = action.payload.delivery_option_name;
      state.delivery_fee = action.payload.delivery_fee;
      state.delivery_option_id = action.payload.delivery_option_id;
    },
  },
});

export const { updateAddressInfo } = addressSlice.actions;
export default addressSlice.reducer;
