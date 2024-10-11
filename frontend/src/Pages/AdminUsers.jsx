import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'

const AdminUsers = () => {
    const[listusers,setlistusers]=useState([])
    useEffect(()=>{
        firstfetch()
       
       },[])
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
  return (
    <div className=''>
        <h1 className='text-2xl mt-3 font-semibold mb-2 ml-2'>All users</h1>
        <div className="mt-5 flex justify-center">
            <DataTable data={listusers}/>
        </div>
     
    </div>
  )
}

export default AdminUsers
