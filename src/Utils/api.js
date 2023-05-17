import axios from '../axios'

 
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
      throw new Error("Something went wrong");
    });
};
 
  
