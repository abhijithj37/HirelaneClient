import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSeeker } from "../../app/features/seekerSlice";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage,setErrorMessage] = useState("");
  const [formData,setFormdata] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define validation rules
    const fNameRegex = /^[a-zA-Z]+$/;
    const lNameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /.{8,}/;

    // Check if input values are valid
    const errors = {};
    if (!formData.fName.match(fNameRegex)) {
      errors.fName = "First name should contain only alphabets";
    }
    if (!formData.lName.match(lNameRegex)) {
       errors.lName = "Last name should contain only alphabets";
    }
    if (!formData.email.match(emailRegex)) {
       errors.email = "Invalid email address";
    }
    if (!formData.password.match(passwordRegex)) {
       errors.password = "Password should contain at least 8 characters";
    }

    // Set error messages for invalid fields

    setFormError(errors);
    if (Object.keys(errors).length !== 0) {
      return;
    }

    axios
      .post(`/seeker/signup`,formData,{ withCredentials: true })
      .then(({ data }) =>{
        console.log(data);
        dispatch(setSeeker( data.seeker ));
        navigate("/");
      })
      .catch((error) =>{
        if (error.response&&error.response.status === 422) {
          setFormError(error.response.data.errors);
        } else {
          setErrorMessage(error.response.data);
        }
      });
  };
  function handleCallbackResponse(response){
    const token = response.credential;
    axios
      .post(`/seeker/googleSignIn`,{ token },{ withCredentials: true })
      .then(({data}) => {
        dispatch(setSeeker(data.seeker));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  useEffect(() => {
    const google = window.google;
    google?.accounts?.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google?.accounts?.id.renderButton(document.getElementById("signInButton"),{
      theme:"outline",
      size:"large",
    });
  },[]);


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

          <Typography variant="h5" gutterBottom color={"primary"}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className="input"
              label="First Name"
              value={formData.fName}
              onChange={(e) =>
                setFormdata({ ...formData, fName: e.target.value })
              }
              margin="small"
              size="medium"
              fullWidth
              required
              error={!!formError.fName}
              helperText={formError.fName || " "}
            />
            {formError.lName && <p>{formError.lName}</p>}
            <TextField
              size="medium"
              label="Last Name"
              value={formData.lName}
              onChange={(e) =>
                setFormdata({ ...formData, lName: e.target.value })
              }
              margin="small"
              fullWidth
              required
              error={!!formError.lName}
              helperText={formError.lName || " "}
            />

            <TextField
              size="medium"
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
              size="medium"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormdata({ ...formData, password: e.target.value })
              }
              margin="small"
              fullWidth
              required
              error={!!formError.password}
              helperText={formError.password||" "}
            />
            <Button onClick={()=>navigate('/login')} sx={{textTransform:'none'}}>
               <Typography>already have an account?</Typography>  
            </Button>
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Sign Up
            </Button>
            <Button id="signInButton" sx={{ marginTop: 1 }} fullWidth></Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
