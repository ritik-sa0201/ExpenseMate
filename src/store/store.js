import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "../slices/Loginreducer";
import SplitSlice from "@/slices/Splitbill";
const store = configureStore({
  reducer: {
    UserLogin: userLoginSlice,
    Splitdetails: SplitSlice,
  },
});

export default store;
