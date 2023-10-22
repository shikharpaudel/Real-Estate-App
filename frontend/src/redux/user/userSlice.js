import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart:(state)=>{
        state.loading = true;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
   deleteFailure : (state,action)=>{
    state.error = action.payload;
    state.loading = false;
   },
   signOutStart:(state)=>{
    state.loading = true;
},
signOutSuccess: (state, action) => {
  state.currentUser = null;
  state.loading = false;
  state.error = null;
},
signOutFailure : (state,action)=>{
state.error = action.payload;
state.loading = false;
},
  },
});
export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure
} = userSlice.actions;

export default userSlice.reducer;
