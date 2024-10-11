import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateEvent = () => {
    const [details, setdetails] = useState({})
    const navigate=useNavigate()

    const url=useParams()
    const fetchid=url.id
    useEffect(()=>{initialfetch()},[])
    const initialfetch=async()=>{
        try {
            const res=await fetch(`http://localhost:5000/event/update_event/${fetchid}`)
            const data=await res.json()
            if(data.success===false){
                console.log(data.error)
            }
            console.log(data)
            setdetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    const handlechange=(e)=>{
        setdetails({...details,[e.target.id]:e.target.value})
        console.log(details)
    }
    const handleupdate=async(e)=>{
        try {
            e.preventDefault()
            console.log(details)
            const res=await fetch(`http://localhost:5000/event/update_event/${fetchid}`,
                {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(details)
            })
            const data=await res.json()
            console.log(data)
            if (data.success===false){
               console.log(data.msg)
               return
            }
            navigate(`/dashboard/allevents`)
            return
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='mt-16'>
    <h1 className='text-center font-semibold text-xl'>Update Event</h1>
    <form onSubmit={handleupdate} className='flex justify-center mt-4 mx-auto'>
        <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center"><label htmlFor=" "className='font-semibold'>Event Name</label>
        <input type="text" value={details.event_title} id='event_title' 
        onChange={handlechange}className='outline-none p-2 bg-gray-100' />
        </div>
        <div className="flex gap-3 items-center"><label htmlFor=" "className='font-semibold'>Description</label>
        <input type="text" value={details.description} id='description' 
        onChange={handlechange}className='outline-none p-2 bg-gray-100' />
        </div>
        <div className="flex gap-3 items-center"><label htmlFor=" "className='font-semibold'>location</label>
        <input type="text" value={details.location} id='location' 
        onChange={handlechange}className='outline-none p-2 bg-gray-100' />
        </div>
        
        <div className="flex items-center gap-2"><label htmlFor="" className='font-semibold'>capacity</label>
        <input type="number"  value={details.capacity} id='capacity' 
        onChange={handlechange} className='outline-none p-2 bg-gray-100' />
        </div>
        <button type='submit' className='bg-green-500 font-semibold text-white p-2 rounded'>Update</button>
        </div>
    </form>
</div>
  )
}

export default UpdateEvent
