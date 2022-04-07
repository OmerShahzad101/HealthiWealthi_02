import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  info:null,
  subscriptionPlan: null,
  company: null,
  departments: [],
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoData(state, { payload: userData }) {
      state.info = userData;
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
    // setInfo: (state, { payload }) => {
    //   return { ...state, info: { ...state.info, avatar: payload } };
    // },
  },
});

export const { setInfoData, setSubscriptionPlan, setCompany, setDepartment, setInfo } =
  authSlice.actions;

export default authSlice.reducer;
