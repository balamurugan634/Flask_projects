import React, { useEffect, useState } from "react";
import Card from "../components/Card";
const Home = () => {
    const[listing,setlisting]=useState([])
    useEffect(()=>{
        intialfetch()
    },[])

    const intialfetch=async()=>{
        try {
            const res=await fetch('http://localhost:5000/books/allbooks')
            const data=await res.json()
            setlisting(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="flex flex-col">
      <div className=" p-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-slate-800">
          Library Management system
        </h1>
      </div>
      <hr />
<div className="flex flex-col justify-center">
        <div className="flex gap-4 flex-wrap">
            {listing.map((item,i)=>(<Card data={item} key={i}/>))}
        </div>
        </div>
    </div>
  );
};

export default Home;
