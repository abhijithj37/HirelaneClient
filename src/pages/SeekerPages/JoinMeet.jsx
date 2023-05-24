import React, { useState } from 'react'
import TopBar from '../meetings/TopBar'
import {Container,Grid,Typography,TextField,Button,Box} from '@mui/material'
function Join() {
    const [meetingId,setMeetingId]=useState('')
  return (
    <div>
      <TopBar></TopBar>
      <Container>
        <Grid minHeight={'60vh'} alignContent={'center'}alignItems={'center'} justifyContent={'center'} container  >
<Grid  alignItems={'center'} justifyContent={'center'} alignContent={'center'}   item lg={4}>
    <Box display={'flex'} justifyContent={'center'}><Typography gutterBottom variant='h4' >Join Meeting</Typography></Box>
    <Box marginTop={4}> 
<Typography variant='body2' color={'gray'} >Enter your meeting id</Typography>
<TextField value={meetingId} onChange={(e)=>setMeetingId(e.target.value)} sx={{borderRadius:3}}  margin='dense' fullWidth size='small' label='Meeting Id'></TextField>
 </Box>
 <Box marginTop={2}>
<Button sx={{borderRadius:4}} disabled={meetingId==""}  fullWidth variant='contained'>Join</Button>
</Box>
</Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Join
