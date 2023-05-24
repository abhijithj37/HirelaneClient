import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

function EmpMeet() {
  const socket=useRef()
  const {employer}=useSelector((state)=>state.employer)
  const {id}=useParams()
 

    
  return (
    <div>
      
    </div>
  )
}

export default EmpMeet
