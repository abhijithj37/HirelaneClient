import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
function Meet(){
const socket =useRef()
const {seeker}=useSelector((state)=>state.seeker)

return (
<div>
       
</div>
  )
}

export default Meet
