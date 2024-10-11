import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import slideimg from '../assets/side2.jpg'
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Link } from "react-router-dom";
const Home = () => {
  const[event,setevent]=useState([])
  useEffect(()=>{
   initialfetch()
  },[])

  const initialfetch=async()=>{
    try {
     const res=await fetch('http://localhost:5000/event/recentevent')
     const data=await res.json()

     if (data.success===false){
      console.log(data.error)
      return
     }
      setevent(data.result)
      return
    } catch (error) {
      console.log(error)
    }
  }
   const listing=['https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','https://images.unsplash.com/photo-1510682657356-6ee07db8204b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
   SwiperCore.use([Navigation])
  return (
    <div className="bg-slate-200 ">
            <Swiper navigation >
        {
          listing.map((list,i) => (
            
            <SwiperSlide key={i}>
              {console.log(list)}
              <div
                style={{
                  background: `url(${list})  center no-repeat`,
                  backgroundSize: 'cover'
                }}
                className='h-[500px]'
                key={i}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className=" flex max-w-6xl gap-4 sm:gap-6 px-3 mx-auto p-10 flex-col ">
        <h1 className='text-2xl lg:text-6xl font-semibold text-slate-600'>Find your <span className='text-slate-800 '>perfect</span> <br /> Weekend Entertainment...</h1>
        <div className="">
        <p className='text-gray-600'>weekent is the best platform to book events and concerts.</p>
          <Link to={'/search'} className='text-green-600 font-semibold'>Explore..</Link>
        </div>  
      </div>
      <div className="flex flex-col mb-2 gap-3">
        <h1 className="font-semibold text-4xl px-3">Our Recent Events</h1>
        
        <div className="flex gap-5 px-3 mt-4 flex-wrap">
          {event.map((item,i)=>(<Card data={item} key={i}/>))}
        </div>
        <div className="flex justify-center"> <Link to={'/getallevents'} className="text-lg rounded-md text-center text-red-50 font-semibold p-2 bg-slate-700 ">Load more</Link></div>
       
      </div>
    </div>
  );
};

export default Home;
