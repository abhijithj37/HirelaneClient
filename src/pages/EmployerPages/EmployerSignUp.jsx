import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import axios from "../../axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmployer } from "../../app/features/employerSlice";
 function EmployerSignUp(){
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [errorMessage,setErrorMessage] = useState("");
  const [formData,setFormdata] = useState({
    name:"",
    companyName:"",
    companySize:'',
    phone:'',
    email:"",
    password:"",
  });

  const [formError,setFormError] = useState({});
  const handleSubmit=(e) =>{
    e.preventDefault();
    // Define validation rules
    const nameRegex=/^[a-zA-Z]+$/;
    const companyNameRegex=/^[a-zA-Z]+$/;
    const emailRegex=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex=/.{8,}/;
    const phoneRegex=/^\d{10}$/
 
    // Check if input values are valid
    const errors = {};
    if (!formData.name.match(nameRegex)) {
      errors.name = "First name should contain only alphabets";
    }
    if (!formData.companyName.match(companyNameRegex)) {
      errors.companyName="Last name should contain only alphabets";
    }
    if (!formData.email.match(emailRegex)){
      errors.email="Invalid email address";
    }
    if (!formData.phone.match(phoneRegex)){
        errors.phone ="Please Enter a valid phone number";
      }
    if (!formData.password.match(passwordRegex)) {
      errors.password="Password should contain at least 8 characters";
    }
    if (formData.companySize===0) {
        errors.companySize="Invalid credential";
    }
     
    // Set error messages for invalid fields
    setFormError(errors);
    if(Object.keys(errors).length!==0){
    return;
    }

    axios
      .post(`/employer/signup`,formData,{withCredentials:true})
      .then(({data})=>{
        dispatch(setEmployer(data.user))
         navigate("/employer");
       })
       .catch((error) => {
        if (error.response && error.response.status === 422){
        setFormError(error.response.data.errors); 
        } else {
          setErrorMessage(error.response.data);
        }  
      });
  };
  
  return (
    <div className="signUp">
      <Container maxWidth="xs">
        <img src="" alt="" />
        <Box
          padding={8}
          marginTop={12}
          sx={{
            bordercolor: "blue",
            border:1,
            padding:2,
            boxShadow:2,
            borderRadius:2,
            borderColor:"lightgray",
          }}
        >
          <Typography color={"red"} textAlign={"center"}>
            {errorMessage}
          </Typography>

          <Typography variant="h5" marginBottom={2} gutterBottom color={"secondary"}>
            Employer Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className="input"
              label="Enter Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormdata({...formData,name:e.target.value})
              }


              margin="small"
              size="small"
              fullWidth
              required
              error={!!formError.name}
              helperText={formError.name||" "}

            />

            <TextField
              size="small"
              label="Your Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormdata({...formData,companyName:e.target.value})
              }
              margin="small"
              fullWidth
              required
              error={!!formError.companyName}
              helperText={formError.companyName ||" "}
            />
            <TextField
              size="small"
              label=" Company Size"
              value={formData.companySize}
              onChange={(e) =>
                setFormdata({...formData,companySize:e.target.value})
              }
              margin="small"
              fullWidth
              required
              error={!!formError.companySize}
              helperText={formError.companySize ||" "}
              type='number'
            />
            <TextField
              size="small"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
              margin="small"
              fullWidth
              error={!!formError.email}
              helperText={formError.email || " "}
              required
            />
            <TextField
              size="small"
              label="Your Phone Number"
              type="number"
              value={formData.phone}
              onChange={(e) =>
                setFormdata({ ...formData, phone: e.target.value })
              }
              margin="small"
              fullWidth
              error={!!formError.phone}
              helperText={formError.phone || " "}
              required
            />

            <TextField
              size="small"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormdata({...formData,password:e.target.value})
              }
              margin="small"
              fullWidth
              required
              error={!!formError.password}
              helperText={formError.password || " "}
            />
            <Link color={'secondary'} href="/login" underline="none">
              already have an account?
            </Link>
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
           </form>
        </Box>
      </Container>
    </div>
  );
}
export default EmployerSignUp