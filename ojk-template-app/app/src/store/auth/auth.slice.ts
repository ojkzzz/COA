import { createSlice } from "@reduxjs/toolkit";
import { getTokensFromStorage } from "utils/tokens";

const initialState = {
  auth: Boolean(getTokensFromStorage().access_token),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export default authSlice;
export const { setAuth } = authSlice.actions;
