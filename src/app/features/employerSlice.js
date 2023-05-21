import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employer: null,
  postedJobs: null,
  jobDetails: null,
  application: null,
  employerApplications:[],
  jobApplications:[],
  chatUser:null
  
};

const employerSlice=createSlice({
  name:"employer",
  initialState,
  reducers:{
    setEmployer:(state, action) => {
    state.employer = action.payload;
    },

    setPostedJobs: (state, action) => {
    state.postedJobs = action.payload;
    },

    setEmpJobDetails: (state, action) => {
      state.jobDetails = action.payload;
    },

    setEmployerApplications: (state, action) => {
    state.employerApplications = action.payload;
    },
    setJobApplications:(state,action) => {
    state.jobApplications=action.payload;
    },
    setChatUser:(state,action)=>{
    state.chatUser=action.payload
    }
  },
});
export default employerSlice.reducer;
export const {
  setEmployer,
  setPostedJobs,
  setEmpJobDetails,
  setEmployerApplications,
  setJobApplications,
  setChatUser
} =employerSlice.actions;
