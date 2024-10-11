import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EventTable = ({data}) => {
    const[filter,setfilter]=useState([])
    const navigate=useNavigate()
    const deleteevent=async(delid)=>{
        try {
            const res =await fetch(`http://localhost:5000/event/delevent/${delid}`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
        
            })
            const data=await res.json()
            console.log(data)
            if(data.success===false){
                console.log(data.msg)
                return
            }
            navigate('/dashboard')
            return

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full sm:max-w-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  bg-slate-800 uppercase text-white">
            <tr>
                 <th scope="col" className="px-6 py-3">
                   Sno
                </th>
                <th scope="col" className="px-6 py-3">
                   event
                </th>
                <th scope="col" className="px-6 py-3">
                    description
                </th>
                <th scope="col" className="px-6 py-3">
                    location
                </th>
                <th scope="col" className="px-6 py-3">
                    date
                </th>
                <th scope="col" className="px-6 py-3">
                    Seats left
                </th>
                <th scope="col" className="px-6 py-3">
                    actions
                </th>
               
            </tr>
        </thead>
        <tbody className='text-slate-800'>
            {filter.length > 1?filter.map((item,i)=>(<tr className="bg-white border-b " key={i}>
                <td className="px-6 py-4">
                    {i+1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                    {item.event_title}
                </th>
                <th className="px-6 py-3   font-medium  whitespace-nowrap">
                    {item.description}
                </th>
                <td className="px-6 py-4">
                    {item.location}
                </td>
                <td className="px-6 py-4">
                    {item.event_date}
                </td>
                <td className="px-6 py-4">
                    {item.capacity}
                </td>
                <td className="px-6 py-4 ">
                    <div className="flex gap-2">
                    <Link to={`/updateevent/${item.event_id}`} className='bg-green-600 p-2 rounded text-white'>update</Link>
                    <button className='bg-red-600 p-2 rounded text-white' onClick={()=>deleteevent(item.event_id)}>delete</button>
                    </div>
                    
                </td>
            </tr>)):data.map((item,i)=>(<tr className="bg-white border-b " key={i}>
                <td className="px-6 py-4">
                    {i+1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                    {item.event_title}
                </th>
                <td className="px-6 py-4">
                    {item.description}
                </td>
                <td className="px-6 py-4">
                    {item.location}
                </td>
                <td className="px-6 py-4">
                    {item.event_date}
                </td>
                <td className="px-6 py-4">
                    {item.capacity}
                </td>
                <td className="px-6 py-4 ">
                    <div className="flex gap-2">
                    <Link to={`/updateevent/${item.event_id}`} className='bg-green-600 p-2 rounded text-white'>update</Link>
                    <button className='bg-red-600 p-2 rounded text-white' onClick={()=>deleteevent(item.event_id)}>delete</button>
                    </div>
                    
                </td>
            </tr>))}
            
           

        </tbody>
    </table>
</div>
  )
}

export default EventTable
