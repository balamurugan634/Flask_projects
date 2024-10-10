import React from 'react'
import { Card } from "flowbite-react";
import image from '../assets/logo.jpeg'
import { FaLocationArrow,FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BookCard = ({items}) => {
    return (
        <Link to={`/eventticket/${items.event_id}`} className="flex items-center w-full md:w-1/2 md:shadow-md rounded ">
            <div className="flex w-1/2"><img src={image} alt="" className='' /></div>
            <div className=" flex flex-col gap-3">
                <h1 className='text-2xl font-semibold'>{items.event_title}</h1>
                <h2 className='flex items-center'><FaMapMarkerAlt className='text-green-600' /><span>{items.location}</span></h2>
                <p>No of tickets <span className='font-semibold'>{items['count(ticket_id)']}</span></p>
            </div>
        </Link>
      );
}
{/*  */}
 {/*  */}
{/*  */}
export default BookCard
