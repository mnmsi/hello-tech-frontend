import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const initialState = {
  data: null,
  login: false,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  let token = getCookie("token");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios
    .get(process.env.NEXT_PUBLIC_API_URL + "/user/me", config)
    .catch((error) => {
      if (error.response.status === 401) {
        deleteCookie("token");
      }
      deleteCookie("token");
    });
  return res.data;
});

const checkAuth = createSlice({
  name: "checkAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.login = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.login = false;
      state.error = action.error.message;
    });
  },
});

export default checkAuth.reducer;
