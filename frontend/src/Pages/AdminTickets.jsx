import React, { useEffect, useState } from 'react'
import TicketTable from '../components/TicketTable'
import AllTickets from '../components/AllTickets'


const AdminTickets = () => {
    const[tickets,settickets]=useState([])
useEffect(()=>{
 thirdfetch()

},[])
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
         <h1 className='text-2xl mt-3 font-semibold mb-2 ml-2'>All Bookings</h1>
         <div className="mt-5 flex justify-center">
       <AllTickets data={tickets} />
       </div>
        
    </div>
  )
}

export default AdminTickets
