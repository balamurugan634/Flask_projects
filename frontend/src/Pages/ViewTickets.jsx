import React, { useEffect, useState } from 'react'
import { BsCalendar2Date } from 'react-icons/bs'
import { FaMapMarker, FaMapMarkerAlt, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const ViewTickets = () => {
    const urlparams = useParams()
    const fetchid = urlparams.id
    console.log(fetchid)
    const { currentUser } = useSelector((state) => state.user)
    const [event, setevent] = useState({})
    const [persondata, setpersondata] = useState([])
    const [numPersons, setNumPersons] = useState(0);
    useEffect(() => {
        firstfetch()
        secondfetch()
    }, [])

    const firstfetch = async () => {
        try {
            const res = await fetch(`http://localhost:5000/event/detail/${fetchid}`)
            const data = await res.json()
            console.log(data)
            if (data.success === false) {
                console.log(data.error)
                return
            }
            setevent(data.result)
            return
        } catch (error) {
            console.log(error)
        }
    }
    const secondfetch = async () => {
        try {
            const res = await fetch(`http://localhost:5000/ticket/geteventticket?user=${currentUser.user_id}&event=${fetchid}`)
            const data = await res.json()
            if (data.success === false) {
                console.log(data.error)
                return
            }
            console.log(data)
            setpersondata(data.result)
            return
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mt-16 flex flex-col gap-4'>
            <h1 className='text-3xl font-semibold text-slate-800 px-2'>{event.event_title}</h1>
            <p className='text-md px-2 text-gray-600'>{event.description}</p>
            <div className="flex gap-3 px-2">
                <div className="flex items-center gap-2"><FaMapMarkerAlt className='text-red-600'/><span>{event.location}</span></div>
                <div className="flex items-center gap-2"><BsCalendar2Date className='text-blue-600' />
                    <span>{event.event_date}</span></div>
            </div>
           
            {persondata.map((per,i)=>(<table className="mx-10  gap-2 max-w-2xl " key={i}>
              
                <tr className=''>
                    <td className='w-1/5 text-green-500'><FaUser /></td>
                    <td className='w-1/5  '>{per.holder_name}</td>
                    <td className='w-1/5  text-blue-600 '><FaPhoneAlt /></td>
                    <td className='w-1/5'>{per.phone}</td>
                    <td className='w-1/5'><Link className='bg-slate-700 p-2 rounded text-white font-semibold' to={`/updateticket/${per.ticket_id}`}>update</Link></td>
                </tr>
            </table>))}
            
        </div>
    )
}

export default ViewTickets
