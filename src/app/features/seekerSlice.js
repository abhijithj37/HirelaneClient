import {createSlice} from '@reduxjs/toolkit'

const initialState=
{
    seeker:null,
    isLoading:true,
    status:false,
    error:null,
    jobToApply:null,
    applications:[],
    chatUser:null
    
}
const seekerSlice=createSlice({
    name:'seeker',
    initialState,
    reducers:{
        setSeeker:(state,action)=>{
        state.seeker=action.payload
        state.status=true
        },
        setJobToApply:(state,action)=>{
        state.jobToApply=action.payload
        },
        setApplications:(state,action)=>{
        state.applications=action.payload
        },
        setChatEmployer:(state,action)=>{
        state.chatUser=action.payload
        }
    }
})
export default seekerSlice.reducer
export const{setSeeker,setJobToApply,setApplications,setChatEmployer}=seekerSlice.actions

