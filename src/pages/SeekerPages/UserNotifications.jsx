import React from "react";
import Header from "../../Components/userComponents/Header";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { setNotifications } from "../../app/features/seekerSlice";

function UserNotifications() {
  const dispatch=useDispatch()
  const { notifications } = useSelector((state) => state.seeker);

  const handleDeleteNotification=(id)=>{
    axios.delete(`seeker/my-notification/${id}`,{withCredentials:true}).then(()=>{
        
        dispatch(setNotifications(notifications?.filter((n)=>n._id!==id)))
    }).catch((err)=>{
        console.log(err.message);
    })

  }
  return (
    <div style={{ background: "#f5f5f5", height: "105vh" }}>
      <Header></Header>
      <Container
        sx={{
          background: "white",
          marginTop: 2,
          height: "93vh",
          paddingTop: 2,
          borderRadius: 1,
           
        }}
        maxWidth="md"
      >
        <Box>
          <Typography
            gutterBottom
            letterSpacing={1.7}
            fontWeight={700}
            variant="h4"
          >
            Notifications
          </Typography>
        </Box>
        <Grid height={'83vh'} sx={{overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display:"none",
          },}} container>

           
          <Grid
            padding={1}
            marginTop={1}
            item
        
            lg={12}
        
          >
              {notifications.length!==0?
            notifications.map((e)=>{
          return(
            <Box border={1}
            padding={1}
            marginTop={1}
             sx={{ borderColor: "lightgray", borderRadius: 2 }}
            >

             
            
            <Box
              width={"100%"}
              justifyContent={"space-between"}
              display={"flex"}
            >
              <Typography variant="h6">{e.from}</Typography>
              <IconButton onClick={()=>handleDeleteNotification(e._id)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography>
                {" "}
                {e.content}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color={"gray"}>
                {new Date(e.createdAt).toLocaleDateString('en-us',{day:'numeric',month:'short',year:'numeric'})}
              </Typography>{" "}
              <Typography variant="caption" color={"gray"}>
                {new Date(e.createdAt).toLocaleTimeString()} 
              </Typography>
            </Box> 
            </Box>
              ) }):
              <Box alignItems={'center'} width={'100%'} display={'flex'} justifyContent={'center'}>
            <Typography variant="h6">No new Notifications</Typography>
          </Box>
          }
          
          </Grid>
         
           


        </Grid>
      </Container>
    </div>
  );
}

export default UserNotifications;
