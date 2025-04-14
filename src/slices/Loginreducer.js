import { createSlice } from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
  name: "user",
  initialState: {
    showForm: false,
    NewUser: false,
  },
  reducers: {
    ToggleLogin(state, action) {
      state.showForm = !state.showForm;
    },
    NewUser(state, action) {
      state.NewUser = !state.NewUser;
    },
  },
});
export const { ToggleLogin, NewUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;
