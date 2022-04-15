import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  avatar:null,
  subscriptionPlan: null,
  company: null,
  departments: [],
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoData(state, { payload: userData }) {
      state.avatar = userData;
    },
    setSubscriptionPlan: (state, { payload: planDetails }) => {
      state.subscriptionPlan = planDetails;
    },
    setCompany: (state, { payload: planDetails }) => {
      state.company = planDetails;
    },
    setDepartment: (state, { payload: planDetails }) => {
      state.departments = planDetails;
    },
   
  },
});

export const { setInfoData, setSubscriptionPlan, setCompany, setDepartment, setInfo } =
  authSlice.actions;

export default authSlice.reducer;
