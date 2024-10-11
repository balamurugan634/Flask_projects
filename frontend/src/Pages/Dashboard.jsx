import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import TicketTable from '../components/TicketTable'
import { SignoutUsersuccess } from '../Redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const[listusers,setlistusers]=useState([])
  const[events,setevents]=useState([])
  const[tickets,settickets]=useState([])
  const dispatch=useDispatch()
  const navigate=useNavigate()


  useEffect(()=>{
   thirdfetch()
  
  },[])
  const handlelogout=()=>{
    try {
        dispatch(SignoutUsersuccess())
        navigate('/login')
    } catch (error) {
        console.log(error)
    }
}
  const firstfetch=async()=>{
    try {
      const res=await fetch('http://localhost:5000/event/recentusers')
      const data=await res.json()
      if(data.success===false){
        console.log(data.error)
        return
      }
      setlistusers(data.result)
      console.log(listusers)
      return
    } catch (error) {
      console.log(error)
    }
  }
  const secondfetch=async()=>{
    try {
      const res=await fetch('http://localhost:5000/event/recentevent')
      const data=await res.json()
      if(data.success===false){
        console.log(data.error)
        return
      }
      setevents(data.result)
      console.log(events)
      return
    } catch (error) {
      console.log(error)
    }
  }
  const thirdfetch=async()=>{
    try {
      const res=await fetch('http://localhost:5000/ticket/recenttickets')
      const data=await res.json()
      if(data.success===false){
        console.log(data.error)
        return
      }
      settickets(data.result)
      console.log(tickets)
      return
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className=''>
      <div className=" flex justify-around mt-3">
      <h1 className=' font-semibold text-2xl'>Admin Dashboard</h1>
      <button onClick={handlelogout} className='p-2 bg-red-500 text-white rounded'>logout</button>
      </div>
     
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        <Link to={'allusers'} className="flex max-w-xl gap-1 items-center p-5  rounded shadow-lg bg-green-600 text-white">
          <div className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 text-white">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
          </svg>


          </div>
          <div className="">
            <h1 className='text-center'>Active users</h1>
          </div>
        </Link>
        <Link to={'allevents'} className="flex gap-1 max-w-xl items-center p-5  rounded shadow-lg bg-green-600 text-white">
          <div className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
          </svg>



          </div>
          <div className="">
            <h1 className='text-center'>Registered events</h1>
          </div>
        </Link>
        <Link to={'/alltickets'} className="flex gap-1 max-w-xl items-center p-5  rounded shadow-lg bg-green-600 text-white">
          <div className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
            <path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
          </svg>




          </div>
          <div className="">
            <h1 className='text-center'>Tickets Interactions</h1>
            <h1 className='text-center'>{tickets.length}</h1>
          </div>
        </Link>
        <Link to={'/addevent'} className="flex gap-1 max-w-xl items-center p-5  rounded shadow-lg bg-green-600 text-white">
          <div className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>





          </div>
          <div className="">
            <h1 className='text-center'>add event</h1>
          </div>
        </Link>
        {/* <Link className=""to={'/addevent'}>add event</Link> */}

      </div>
      <div className="mt-10 px-5 flex flex-col items-center">
        <h1 className='text-2xl font-semibold mb-2'>Recent Bookings</h1>
       <TicketTable data={tickets} />
        
        </div>
    </div>
  )
}

export default Dashboard
