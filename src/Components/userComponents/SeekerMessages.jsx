import { Box, Typography, } from "@mui/material";
 import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
 import {format} from 'timeago.js'
import SeekerSingleMessage from "./SeekerSingleMessage";
  
function SeekerMessages({messages}) {
     const scrollRef = useRef();
     const {seeker} = useSelector((state)=>state.seeker)


  useEffect(()=>{
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  
  return(
    <Box
            padding={3}
            style={{
              flex: 1,
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {messages.map((message, index) => (

              <SeekerSingleMessage scrollRef={scrollRef} key={index} message={message}/>
              
    //           <div
    //           ref={scrollRef}
    //              key={index}
    //               style={{
    //               display:"flex",
    //               justifyContent:
    //               message.from ==`${seeker?._id}` ? "flex-end" : "flex-start",
    //               marginBottom: "10px",
    //             }}
    //           >
    //             <div
    //               style={{
    //                 backgroundColor: 
    //                 message.from === `${seeker?._id}`? "#3f51b5" : "#f5f5f5",
    //                 color: message.from ===`${seeker?._id}` ? "#fff" : "#000",
    //                 borderRadius:"17px",
    //                 padding:"10px",
    //                 maxWidth:"70%",
    //                 wordBreak:"break-word",
    //               }}
    //             >
    //               {message?.message}
                  
    //             </div>
    //             <div
    //   style={{
    //     alignSelf: "flex-end",
    //     fontSize: "12px",
    //     color: "#999",
    //     marginTop: "5px",
    //   }}
    // >
    //   {format(message.createdAt)}

    //   </div>

    //            </div>
              
            ))}
          </Box>
      
        
  );
}

export default SeekerMessages;
