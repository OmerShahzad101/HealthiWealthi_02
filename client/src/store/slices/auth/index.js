import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userRole: null,
  username: null,
  userid: null,
  UserEmail: null,
  userRoleId: null,
  permissions: [],
  accessToken: null,
  // acessPageDashboard: null,
  Userabout: null,
  firstName: null,
  secondName: null,
  profile: null,
  specialization: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      const {
        role,
        name,
        email,
        _id,
        about,
        firstname,
        lastname,
        specialization,
        profile,
      } = payload;
      state.userRole = role;
      state.username = name;
      state.userid = _id;
      state.UserEmail = email;
      state.Userabout = about;
      state.firstName = firstname;
      state.secondName = lastname;
      state.specialization = specialization;
      state.profile = profile;
    },
    // setDashboardName(state, { name }) {
    //   state.acessPageDashboard = name;
    // },
    setUserPermissions(state, { payload: permissions }) {
      state.permissions = permissions;
    },
    setAccessToken(state, { payload: accessToken }) {
      state.accessToken = accessToken;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {},
});

export const { setUser, setUserPermissions, setAccessToken, setDashboardName } =
  authSlice.actions;
export default authSlice.reducer;
