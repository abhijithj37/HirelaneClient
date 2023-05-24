import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setChatUser } from '../../app/features/employerSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Box,Typography,Container,Button,Avatar,Toolbar} from '@mui/material'
import axios from '../../axios'
function InterviewDetails() {
    const {employer}=useSelector((state)=>state.employer)
    const {id}=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [application,setApplication]=useState(null)
    const [interviewDetails,setInterviewDetails]=useState(null)
    
 
useEffect(()=>{
    axios.get(`applications/emp-getApplication/${id}`,{withCredentials:true}).then(({data})=>{
        setApplication(data)
    }).catch((err)=>{
        console.log(err.message);
    })
},[])
useEffect(()=>{
axios.get(`applications/emp-interviewDetails/${id}`,{withCredentials:true}).then(({data})=>{
setInterviewDetails(data)
}).catch((err)=>{
  console.log(err)
})
},[])

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.common.white,
        flexGrow: 1,
        height:"100vh",
        overflow:"auto",
      }}
    >
      <Toolbar />
      

      <Container sx={{paddingTop:2}}>
        <Box
          border={1}
          borderRadius={2}
          sx={{ borderColor: "lightgray" }}
          padding={2}
          display={"flex"}
          justifyContent={"space-between"}
          width={'100%'}
          
        >
          {/* ********************************************** */}
 
          <Box >
            <Box marginTop={1} display={"flex"}>
              <Box>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  src={`http://localhost:4001/image/${application?.image}`}
                ></Avatar>
              </Box>
              <Box marginLeft={1}>
                <Typography variant="h5">
                {application?.fName} {application?.lName}
                </Typography>

                <Typography variant="body2" color={"gray"}>
                  Applied on {application?.createdAt}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} padding={0} marginTop={1}>
              <Button
                target="_blank"
                href={application?.cvUrl}
                size="small"
                sx={{ borderRadius: 5 }}
                variant="contained"
              >
                View CV
              </Button>
              <Button
                size="small"
                sx={{ borderRadius: 5, marginLeft: 1 }}
                variant="outlined"
                onClick={() => {
                  dispatch(
                    setChatUser({
                      name: application?.fName + " " + application?.lName,
                      _id: application?.candidateId,
                      image: application?.image,
                    })
                  );
                  navigate("/employer/employerChat");
                }}
              >
                Message
              </Button>
            </Box>
          </Box>
          <Box width={'15%'}>
          <Box
            borderRadius={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={
              application?.status === "Shortlisted" ? "lightgreen" : "lightblue"
            }
            maxWidth={200}
            maxHeight={30}
            padding={0.5}
          >
            <Typography fontWeight={600} variant="body2" color={"white"}>
              {application?.status}
            </Typography>
          </Box>
        </Box>
        </Box>
        {/* ********************************************** */}


<Box display={'flex'} justifyContent={'space-between'}> 
{/* ********************************Application Details****************************************************************************** */}

        <Box
          padding={2}
          border={1}
          borderRadius={2}
          sx={{ borderColor: "lightgray" }}
          marginTop={1}
          width={'50%'}
        >
          <Box>
            <Typography variant="h6">Application Details</Typography>
            <Typography color={"gray"} fontWeight={500}>
              Contact information
            </Typography>
          </Box>
          <Box
            boxShadow={1}
            marginTop={1}
            border={1}
            borderRadius={1}
            sx={{ borderColor: "lightgray" }}
          >
            <Box padding={1} borderBottom={1} sx={{ borderColor: "lightgray" }}>
              <Typography color={"gray"}>Full Name</Typography>
              <Typography sx={{ opacity: 0.9 }} fontWeight={600}>
                {application?.fName} {application?.lName}
              </Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={1}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography sx={{ opacity: 0.9 }} color={"gray"}>
                Email address
              </Typography>
              <Typography sx={{ opacity: 0.9 }} fontWeight={600}>
                {application?.email}
              </Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={1}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography color={"gray"}>Phone</Typography>
              <Typography fontWeight={600}>{application?.phone}</Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={0}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography color={"gray"}>Applied Post</Typography>
              <Typography fontWeight={600}>{application?.jobTitle}</Typography>
            </Box>
          </Box>

          <Box marginTop={1.5}>
            <Box>
              <Typography color={"black"} fontSize={"18px"} fontWeight={500}>
                Screening Questions Responses
              </Typography>
            </Box>

            <Box borderRadius={1} sx={{ borderColor: "lightgray" }} padding={1}>
              {application &&
                application?.questions.map((ques, idx) => {
                  return (
                    <Box
                      key={idx}
                      marginTop={1}
                      sx={{ borderColor: "lightgray" }}
                      borderBottom={1}
                    >
                      <Typography>
                        {idx + 1}.{ques.question}
                      </Typography>
                      <Typography fontWeight={600}>{ques.answer}</Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>

 {/* ********************************Interview Details****************************************************************************** */} 
 <Box
          padding={2}
          border={1}
          borderRadius={2}
          sx={{ borderColor: "lightgray" }}
          marginTop={1}
          width={'48%'}
        >
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box> 
            <Typography variant="h6">Interview Details</Typography>
            </Box>
            <Box>
                <Button size='small' variant='contained'>Reshedule</Button>
            </Box>
          </Box>
          <Box
            
            marginTop={2}
            border={1}
            borderRadius={1}
            sx={{ borderColor: "lightgray" }}
          >
            <Box padding={1} borderBottom={1} sx={{ borderColor: "lightgray" }}>
              <Typography color={"gray"}>Date</Typography>
              <Typography sx={{ opacity: 0.9 }} fontWeight={600}>
                {new Date(interviewDetails?.date).toLocaleDateString('en-US',{
                    day:'numeric',
                    month:'short',
                    year:'numeric'
                })}
              </Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={1}
              sx={{ borderColor: "lightgray" }}
                
            >
             
              <Typography sx={{ opacity: 0.9 }} color={"gray"}>
                Start time
              </Typography>
              <Typography sx={{ opacity: 0.9 }} fontWeight={600}>
                {new Date(interviewDetails?.startTime).toLocaleTimeString()}
              </Typography>
              
               
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={1}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography color={"gray"}>End time</Typography>
              <Typography fontWeight={600}>{new Date(interviewDetails?.startTime).toLocaleTimeString()}</Typography>
            </Box>
            <Box
              marginTop={1}
              padding={1}
              borderBottom={0}
              sx={{ borderColor: "lightgray" }}
            >
              <Typography color={"gray"}>Interview Mode</Typography>
              <Typography fontWeight={600}>{interviewDetails?.interviewMode}</Typography>
            </Box>
            {interviewDetails?.location!==""&&<Box
              marginTop={1}
              padding={1}
              borderBottom={0}
              sx={{borderColor:"lightgray"}}
            >
              <Typography color={"gray"}>Location</Typography>
              <Typography fontWeight={600}>{interviewDetails?.location}</Typography>
            </Box>}
             
          </Box>

          <Box display={'flex'}  justifyContent={'space-between'} marginTop={2}>
            <Box>
             <Button onClick={()=>navigate(`/start-meet`)} color='success' variant='contained'>Start Interview</Button>
            </Box>
            <Box>
             <Button variant='outlined'>Update status</Button>
            </Box>
             
          </Box>
        </Box>
  </Box>
      </Container>
    </Box>

     
  )
}

export default InterviewDetails
