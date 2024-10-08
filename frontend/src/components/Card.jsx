import React from "react";
import book from "../assets/card1.jpg";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

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
          {/* <p className='text-lg font-semibold text-slate-600'>${listing.offers  ? listing.discountprice.toLocaleString('en-US') :listing.regularprice.toLocaleString('en-US')}{listing.type==='rent' && ' / month'}</p> */}

          {/* <div className="text-slate-700 flex gap-4 text-sm font-semibold">
              <div className="">{listing.bedrooms} {listing.bedrooms >1 ?' beds':' bed'}</div>
              <div className="">{listing.bathrooms} {listing.bathrooms >1 ?' baths':' bath'}</div>
          </div> */}
          
      </div>
    </Link>
  </div>
  );
};

export default Card;
