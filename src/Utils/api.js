import { useEffect, useRef } from 'react';
import axios from '../axios'
import { useSocket } from '../Context/SocketProvider';
import { useSelector } from 'react-redux';
  
export const verifyEmployer = () => {

  return axios
    .get("/employer/verifyEmployer", { withCredentials: true })
    .then(({ data }) => {
    
       return data.user;
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized");
      }
      throw new Error("Something went wrong");
    });
};

export const verifySeeker=()=>{
    return axios
    .get("/seeker/verifyUser", { withCredentials: true })
    .then(({ data }) => {
     return data.user[0];
    })
    .catch((error) => {
    if (error.response && error.response.status === 401) {
    throw new Error("Unauthorized");
    }
    throw new Error("Something went wrong")
    });
};

export const useConnectUser=()=>{
  const socket=useSocket()
  const {seeker}=useSelector((state)=>state.seeker)
  
  useEffect(()=>{
    if(seeker){
      socket?.emit("connect-user",seeker?._id)
    }
   },[seeker?._id,socket,seeker])
}
 
export const useConnectEmployer=()=>{
  const socket=useSocket()
  const {employer}=useSelector((state)=>state.employer)
  useEffect(()=>{
    if(employer){
      socket?.emit("connect-user",employer?._id)
    }
   },[employer?._id,socket,employer])
}


  
