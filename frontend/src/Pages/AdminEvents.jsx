import React, { useEffect, useState } from 'react'
import EventTable from '../components/EventTable'

const AdminEvents = () => {
  const[events,setevents]=useState([])
  useEffect(()=>{
    secondfetch()
   
   },[])
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
  return (
    <div className=''>
    <h1 className='text-2xl mt-3 font-semibold mb-2 ml-2'>All Events</h1>
    <div className="mt-5 flex justify-center">
  <EventTable data={events} />
  </div>
   
</div>
  )
}

export default AdminEvents
