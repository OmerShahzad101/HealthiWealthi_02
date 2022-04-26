import { createSlice } from "@reduxjs/toolkit";

let usr = localStorage.getItem('user')
usr = JSON.parse(usr)

const initialState = {
  user: {
    userRole: usr ? usr.type : null,
    username: null,
    userid: usr ? usr._id : null,
    UserEmail: null,
    userRoleId: null,
    permissions: [],
    accessToken: usr ? usr.accessToken : null,
    // acessPageDashboard: null,
    Userabout: null,
    firstName: null,
    lastName: null,
    fileName: null,
    specialization: null,
  },
  clientProfile: {
    firstName: null,
    lastName: null,
    gender: null,
    bloodGroup: null,
    phoneNumber: null,
    about: null,
    city: null,
    state: null,
    country: null,
    postalCode: null,
  },
  coachProfile: {
    firstName: null,
    lastName: null,
    gender: null,
    bloodGroup: null,
    phoneNumber: null,
    about: null,
    city: null,
    state: null,
    country: null,
    postalCode: null,
    specialization: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      console.log("payloadokokokokokoko", payload);
      const { res, response } = payload;

      if (res) {
        state = {
          ...state,
          user: {
            ...state.user,
            Userabout: res.about,
            firstName: res.firstname,
            lastName: res.lastname,
            specialization: res?.specialization,
            fileName: res?.fileName,
          },
          clientProfile: { ...state.clientProfile },
          coachProfile: { ...state.coachProfile },
        };
      }
      if (response) {
        state = {
          ...state,
          user: {
            ...state.user,
            userRole: response.type,
            username: response.name,
            userid: response?._id,
            UserEmail: response.email,
          },
          clientProfile: { ...state.clientProfile },
          coachProfile: { ...state.coachProfile },
        };
      }
      return state;
    },
    setClientProfile(state, { payload }) {
      const { res } = payload;
      state = {
        ...state,
        user: {
          ...state.user,
        },
        clientProfile: {
          ...state.clientProfile,
          firstName: res.firstname,
          lastName: res.lastname,
          gender: res.gender,
          bloodGroup: res.bloodgroup,
          phoneNumber: res.phone,
          about: res.about,
          city: res.city,
          state: res.state,
          country: res.country,
          postalCode: res.postalCode,
        },
        coachProfile: { ...state.coachProfile },
      };
      return state;
    },
    setCoachProfile(state, { payload }) {
      console.log("coachProfile", payload);
      const { res } = payload;
      state = {
        ...state,
        user: {
          ...state.user,
        },
        clientProfile: { ...state.clientProfile },
        coachProfile: {
          ...state.coachProfile,
          firstName: res.firstname,
          lastName: res.lastname,
          specialization: res.specialization,
          // gender: res.gender,
          // bloodGroup: res.bloodgroup,
          // phoneNumber: res.phone,
          // about: res.about,
          city: res.city,
          state: res.state,
          country: res.country,
          // postalCode: res.postalCode,
        },
      };
      return state;
    },
    setUserPermissions(state, { payload: permissions }) {
      state.permissions = permissions;
    },
    setAccessToken(state, { payload: accessToken }) {
      state.accessToken = accessToken;
    },
    setImage(state, { payload: fileName }) {
      state.user.fileName = fileName;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {},
});

export const {
  setUser,
  setUserPermissions,
  setAccessToken,
  setDashboardName,
  setClientProfile,
  setCoachProfile,
  setImage
} = authSlice.actions;
export default authSlice.reducer;
