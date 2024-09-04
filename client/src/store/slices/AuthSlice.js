import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  accessToken: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      console.log("login calllesd", state);
      state.accessToken = action.payload;
    },
    userLogout: (state) => {
      state.accessToken = "";
    },
  },
});
export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
