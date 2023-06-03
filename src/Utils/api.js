import { useEffect } from 'react';
import axios from '../axios'
import { useSocket } from '../Context/SocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setNotifications } from '../app/features/seekerSlice';
  
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
  const dispatch=useDispatch()
  const {seeker,notifications}=useSelector((state)=>state.seeker)
  
 
  useEffect(()=>{
    if(seeker){
      socket?.emit("connect-user",seeker?._id)
    }
   },[seeker?._id,socket,seeker])

   useEffect(()=>{
    axios.get('/seeker/my-notifications',{withCredentials:true}).then(({data})=>{
      dispatch(setNotifications(data))
    }).catch((err)=>{
      console.log(err.message);
    })
    },[dispatch])
    

    useEffect(()=>{
    socket.on('arriving-notification',(data)=>{
    dispatch(setNotifications([data,...notifications]))
    })
    },[dispatch,notifications,socket])


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


 
  
