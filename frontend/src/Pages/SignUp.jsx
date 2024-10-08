import React from 'react'
import logo from '../assets/logo.jpeg'
import side from '../assets/side2.jpg'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <div className='w-full h-screen  overflow-hidden flex flex-col'>
            <div className='flex justify-evenly'>
                <div className='w-full md:w-1/2 h-full '>
                <div className="lg:max-w-xl flex flex-col mx-auto">
                    <div className='flex gap-2 items-center mt-2' >
                        <img className='h-[5rem]' src={logo}/>
                        <h1 className='font-semibold text-2xl'>Brain Storm</h1>
                    </div>
                    <form method='POST' className='flex flex-col'>
                        <h1 className='text-3xl font-semibold p-2'>Hi there  &#128075;</h1>
                        <p className='text-md text-gray-400 px-2'>create free account</p>
                        <div className="mt-2 px-2 flex flex-col gap-3 lg:gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-md font-semibold'>Name</label>
                                <input type="text" className='p-2 rounded-sm bg-gray-100 focus:border-green-100 focus:border outline-none' placeholder='user name' required/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-md font-semibold'>Email</label>
                                <input type="email" className='p-2 rounded-sm bg-gray-100 focus:border-green-100 focus:border outline-none' placeholder='Email address' required/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-md font-semibold'>Password</label>
                                <input type="password" className='p-2 rounded-sm  bg-gray-100 focus:border-green-100 focus:border outline-none' placeholder='password' required/>
                            </div>
                            <div className=" flex flex-col gap-2 mt-2">
                                <button type='submit' className='bg-[#24ae7c] rounded-md px-3 py-2 font-semibold text-white shadow-sm'>Sign up</button>
                                <p className='text-sm text-gray-500'>Already have an account ? <Link to={'/login'} className='text-blue-500 '>login</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
                <div className='hidden md:w-1/2 md:block object-cover'>
                    <img src={side} alt=""  />
                </div>
            </div>
        </div>
    )
}

export default SignUp
