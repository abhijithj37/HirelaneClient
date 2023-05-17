import React, { useEffect, useState } from "react";
import Header from "../../Components/userComponents/Header";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "../../axios";
import { setApplications } from "../../app/features/seekerSlice";
function MyJobs() {
    const dispatch=useDispatch()
  const navigate = useNavigate();
  const { seeker,applications } = useSelector((state) => state.seeker);
  const [tabValue, setTabValue] = useState("2");
  
  const tabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  useEffect(()=>{
    if(seeker){
    axios.get('/applications/userApplications',{withCredentials:true}).then(({data})=>{
        
    dispatch(setApplications(data.applications))
    }).catch((err)=>{
    console.log(err);
    })
    }
     
  },[])
 
  
  return (
    <div>
      <Header></Header>
      <Container maxWidth="md">
        <Grid container rowGap={3} paddingTop={4} border={0}>
          <Grid item width={"100%"}>
            <Typography letterSpacing={1.7} fontWeight={700} variant="h4">
              My jobs
            </Typography>
          </Grid>
          {/* ******************************************************************************************************************************************************* */}

          <Grid item width={"100%"}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "black" }}>
                  <TabList
                    onChange={tabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Saved" value="1" />
                    <Tab label="Applied" value="2" />
                    <Tab label="Interviews" value="3" />
                  </TabList>
                </Box>

                <TabPanel value="1">saved</TabPanel>
                <TabPanel value="2">
                  <Box marginTop={2}>
                    <Typography
                      fontWeight={600}
                      sx={{ opacity: 0.7 }}
                      variant="h6"
                    >
                      Last 14 Days
                    </Typography>
                    <Divider sx={{ marginTop: 1 }} />
                  </Box>



          {applications.length&&applications.map((data,index)=>{
              return(
              <Grid item container marginTop={3}>
                    <Grid item lg={1.3}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={50}
                        height={50}
                        bgcolor={"#eeeeee"}
                        borderRadius={2}
                      >
                        <BusinessIcon color="action" />
                      </Box>
                    </Grid>
                    <Grid item lg={7.7}>
                      <Box>
                        {/* <Box
                          borderRadius={1}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          bgcolor={"#e1f5fe"}
                          width={70}
                          height={25}
                        >
                          <Typography
                            fontWeight={600}
                            variant="body2"
                            color={"primary"}
                          >
                            {data.status}
                          </Typography>
                        </Box> */}
                        <Box marginTop={0.5}>
                          <Typography
                            variant="h6"
                            color={"black"}
                            component={Link}
                          >
                            {data.jobTitle}
                          </Typography>
                          <Typography>{data.companyName}</Typography>
                          <Typography>{data.jobLocation}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color={"gray"}>
                            Applied on {data.createdAt}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid justifyContent={"end"} item lg={3}>
                      {/* <Box
                        display={"flex"}
                        justifyContent={"center"}
                        border={1}
                        borderColor={"lightgray"}
                        borderRadius={2}
                      >
                        <Button sx={{ textTransform: "none" }}>
                          Withdraw application
                        </Button>
                      </Box> */}
                      <Box
                          borderRadius={1}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          bgcolor={"#e1f5fe"}
                          width={70}
                          height={25}
                        >
                          <Typography
                            fontWeight={600}
                            variant="body2"
                            color={"primary"}
                          >
                            {data.status}
                          </Typography>
                        </Box>
                      
                    </Grid>
                    <Grid  marginTop={1.5} item lg={12}>
                        <Divider/>
                    </Grid>
                  </Grid>
   )
})}
      
                  
                </TabPanel>
                <TabPanel value="3">Interviews</TabPanel>
              </TabContext>
            </Box>
          </Grid>
          {/* ********************************************************************************************************************************************************** */}
        </Grid>
      </Container>
    </div>
  );
}

export default MyJobs;
