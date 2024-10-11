import React, { useState } from 'react'
import logo from '../assets/evlogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignoutUsersuccess } from '../Redux/user/userSlice';
const Navbar = ({ items }) => {
    const dispatch=useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user)
    const navigate=useNavigate()
    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handlelogout=()=>{
        try {
            dispatch(SignoutUsersuccess())
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    // const {currentUser}=useSelector((state)=>state.user)

    return (
        <>
           <nav className=' bg-white shadow border-gray-200 fixed  w-full z-20 top-0 font-poppins'>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-14" alt="Logo" />
                        <Link to={'/'} className="self-center text-2xl font-semibold whitespace-nowrap ">Event<span className=''>Manager</span></Link>
                    </a>
                    <button
                        data-collapse-toggle="Nav-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                        aria-controls="Nav-default"
                        aria-expanded={isMenuOpen}
                        onClick={handleToggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="Nav-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0    dark:border-gray-700">
                            {/* {
                                items.map((item) => (

                                    <li key={item.id} >
                                        <Link
                                            to={`/${item.path}`}
                                            className="block py-2 px-3 text-black  rounded capitalize font-semibold md:p-0 hover:underline transistion-all duration-200 underline-offset-4 "
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            } */}
                            <li >
                                <Link
                                    to={`/home`}
                                    className="block py-2 px-3   rounded capitalize font-semibold md:p-0 hover:underline transistion-all duration-200 underline-offset-4 "
                                >
                                    Home
                                </Link>
                            </li>
                            <li >
                                <Link
                                    to={`/getallevents`}
                                    className="block py-2 px-3   rounded capitalize font-semibold md:p-0 hover:underline transistion-all duration-200 underline-offset-4 "
                                >
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`/mybookings/${currentUser.user_id}`}
                                    className="block py-2 px-3   rounded capitalize font-semibold md:p-0 hover:underline transistion-all duration-200 underline-offset-4 "
                                >
                                    Mybooking
                                </Link>
                            </li>
                            <li>
                                <button onClick={handlelogout} className='px-1 py-1 bg-red-700 rounded text-white'>logout</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
