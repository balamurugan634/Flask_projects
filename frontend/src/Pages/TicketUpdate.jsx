import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TicketUpdate = () => {
    const [details, setdetails] = useState({})
    const urlparams = useParams()
    const fetchid = urlparams.id
    const navigate=useNavigate()

    useEffect(() => {
        firstfetch()
    }, [])
    const firstfetch = async () => {
        try {
            const res = await fetch(`http://localhost:5000/ticket/update/${fetchid}`)
            const data = await res.json()
            console.log(data)
            if (data.success === false) {
                console.log(data.error)
                return
            }
            setdetails(data)
            return
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
            const res =await fetch(`http://localhost:5000/ticket/update/${fetchid}`,
                {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(details)
            })
            const data=await res.json()

            if (data.success===false){
               console.log(data.msg)
               return
            }
            navigate(`/eventticket/${details.event_id}`)
            return
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mt-16'>
            <h1 className='text-center font-semibold text-xl'>Update Details</h1>
            <form onSubmit={handleupdate} className='flex justify-center mt-4 mx-auto'>
                <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center"><label htmlFor=" "className='font-semibold'>Name</label>
                <input type="text" value={details.holder_name} id='holder_name' 
                onChange={handlechange}className='outline-none p-2 bg-gray-100' />
                </div>
                <div className="flex items-center gap-2"><label htmlFor="" className='font-semibold'>phone</label>
                <input type="tel"  value={details.phone} id='phone' 
                onChange={handlechange} className='outline-none p-2 bg-gray-100' />
                </div>
                <button type='submit' className='bg-green-500 font-semibold text-white p-2 rounded'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default TicketUpdate
