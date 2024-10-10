import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import { useParams } from 'react-router-dom'

const MyBooking = () => {
    const urlparam=useParams()
    const [listing,setlisting]=useState([])
    const fetchid=urlparam.id
    useEffect(()=>{
        initialfetch()
    },[])
    const initialfetch=async()=>{
        try {
            const res=await fetch(`http://localhost:5000/ticket/mytickets/${fetchid}`)

            const data=await res.json()
            if(data.success===false){
                console.log(data.error)
                return
            }
            setlisting(data.result)
            return

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='mt-20 '>
     <h1 className='font-semibold text-2xl px-2'>My Bookings</h1>
     <div className="flex flex-col items-center gap-5">
     {listing.map((item,i)=>(<BookCard items={item} key={i}/>))}
     </div>
     
     
    </div>
  )
}

export default MyBooking
