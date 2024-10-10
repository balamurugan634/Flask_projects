import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { IoTicket } from "react-icons/io5";

import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const EventDetail = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [copied, setcopied] = useState(false);
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [numPersons, setNumPersons] = useState(0);
  const [personData, setPersonData] = useState([]);
    const [deatils, setdetails] = useState({})
    const navigate=useNavigate()

    const listing = ['https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1510682657356-6ee07db8204b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
    useEffect(() => {
        const initialfetch = async () => {

            const fetchid = params.id;
            try {

                const res = await fetch(`http://localhost:5000/event/detail/${fetchid}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.error);
                    return;
                }
                setdetails(data.result);

                console.log(data);
                // console.log(listing)
            } catch (error) {
                console.log(error);
            }
        };
        initialfetch();
    }, [params.id]);
    const handleNumPersonsChange = (e) => {
        const value = parseInt(e.target.value, 10);

        
        if (isNaN(value) || value < 0) {
          alert('Please enter a valid non-negative number');
          return;
        }
      
        setNumPersons(value);
      
        
        const newData = Array.from({ length: value }, () => ({ name: '', phone: '' }));
        setPersonData(newData);
      };
      const handleInputChange = (index, field, value) => {
        const newPersonData = [...personData];
        newPersonData[index][field] = value;
        setPersonData(newPersonData);
      };
      const handleSubmit =async (e) => {
        e.preventDefault();
       try {
        const tosend={users:personData,bk_id:currentUser.user_id}
        const res=await fetch(`http://localhost:5000/ticket/bookticket/${deatils.event_id}`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(tosend)
        })
        const data=await res.json()
        if (data.success===false){
            console.log(data.msg)
            return
         }
        navigate('/home')
        return
       } catch (error) {
        console.log(error)
       }
    console.log(personData)
      };
    return (
        <div className='mt-16'>
            <Swiper navigation>
                {listing.map((url) => (
                    <SwiperSlide key={url}>
                        <div
                            className="h-[550px]"
                            style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: "cover",
                            }}
                        ></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full  w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointe">
                <FaShare
                    className="text-slate-500"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setcopied(true);
                        setTimeout(() => {
                            setcopied(false);
                        }, 2000);
                    }}
                />
            </div>
            {copied && (
                <p className="fixed top-[23%] right-[5%] z-10 bg-slate-100 p-2">
                    Link copied !
                </p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-3 gap-3">
                <h1 className="text-2xl font-semibold">{deatils.event_title}</h1>
                <p className="flex items-center  gap-2 text-slate-600 text-sm">
                    <FaMapMarkerAlt className="text-green-700" />
                    {deatils.location}
                </p>
                <p className="text-slate-600 text-sm">
                    {deatils.description}
                </p>
                <div className="flex items-center gap-2">
                <IoTicket className="text-blue-600"/>
                    <p>Only Seats left <span className="font-semibold text-xl text-red-600">{deatils.capacity}</span></p>
                </div>
                <form onSubmit={handleSubmit}>
    
        <div>
          <label className="font-semibold">Number of Persons: </label>
          <input 
            type="number" 
            value={numPersons} 
            onChange={handleNumPersonsChange} 
            min="0" 
            className="bg-gray-200 p-1"
          />
        </div>

        {Array.from({ length: numPersons }).map((_, index) => (
          <div key={index} className="mt-3 flex flex-col gap-2">
            <h3 className="flex items-center gap-1"><FaUser className="text-green-600" /><span>Person {index + 1}</span></h3>
            <div className=" sm:flex sm:items-center gap-2">
            <div >
              <label className="font-semibold">Name: </label>
              <input 
                type="text" 
                value={personData[index]?.name || ''} 
                className="p-1 sm:p-2 mb-2 sm:mb-0 bg-gray-200 rounded"
                onChange={(e) => handleInputChange(index, 'name', e.target.value)} 
              />
            </div>
            <div>
              <label className="font-semibold">Phone: </label>
              <input 
                type="tel" 
                className="p-1 sm:p-2 bg-gray-200 rounded"
                value={personData[index]?.phone || ''} 
                onChange={(e) => handleInputChange(index, 'phone', e.target.value)} 
              />
            </div>
            </div>
          </div>
        ))}

        <div className="mt-2 mx-auto">
          <button type="submit" className="bg-green-700 py-2 px-4 text-white font-semibold rounded-lg shadow-sm ">Book Now</button>
        </div>
      </form>
            </div>
        </div>
    )
}

export default EventDetail
