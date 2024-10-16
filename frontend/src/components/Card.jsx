import React from "react";
import book from "../assets/card1.jpg";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTicket } from "react-icons/fa6";

const Card = ({data}) => {
  return (
    <div className='shadow-md hover:shadow-lg overflow-hidden rounded-lg transition-shadow w-full sm:w-[330px] bg-white'>
    <Link to={`/event/${data.event_id}`}>
    <img src={book} className='w-full hover:scale-105 transition-scale duration-300  h-[200px] sm:h-[200px] object-cover overflow-hidden' alt="sdfs" />
      <div className="p-3 flex flex-col gap-2 w-full">
          <h1 className='truncate text-lg font-semibold text-slate-800'>{data.event_title}</h1>
          <div className="flex items-center gap-1 w-full">
              <MdLocationOn className='h-4 w-4  text-green-700'/>
              <p className='text-sm text-gray-500 truncate w-full '>{data.location}</p>
          </div>
          
          <p  className='line-clamp-2 text-sm text-gray-500'>{data.description}</p>
          <p className="flex items-center  gap-2 text-slate-600 text-sm">
                <FaTicket className="text-blue-700" />

                {data.capacity} left {data.event_date}</p>
         
          
      </div>
    </Link>
  </div>
  );
};

export default Card;
