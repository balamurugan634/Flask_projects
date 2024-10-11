import React, { useState } from 'react'
import logo from '../assets/logo.jpeg'
import side from '../assets/side2.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SigninSuccess } from '../Redux/user/userSlice'
const SignIn = () => {
    const dispatch=useDispatch()
    const[formdata,setFormdata]=useState({})
    const navigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault()
        try {
            const res=await fetch("http://localhost:5000/auth/login",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formdata)
            })

            const data=await res.json()

            if (data.success===false){
               console.log(data.msg)
               return
            }
            console.log(data.user)
            dispatch(SigninSuccess(data.user))
            if(data.user.role==='admin'){
                navigate('/dashboard')
            return
            }
            navigate('/home')
            return
        } catch{(error)=>{
            console.log(error)
        }
        }
    }

    const handleChange=(e)=>{
        setFormdata({...formdata,[e.target.id]:e.target.value})
        console.log(formdata)
    }
    return (
        <div className='w-full h-screen  overflow-hidden  flex flex-col'>
            <div className='flex justify-evenly'>
                <div className='w-full md:w-1/2 h-full '>
                <div className="lg:max-w-xl flex flex-col mx-auto">
                    {/* <div className='flex gap-2 items-center mt-2' >
                        <img className='h-[5rem]' src={logo}/>
                        <h1 className='font-semibold text-2xl'>Brain Storm</h1>
                    </div> */}
                    <form method='POST'onSubmit={handlesubmit} className='flex flex-col'>
                        <h1 className='text-3xl font-semibold p-2'>Hi Welcome back  &#128075;</h1>
                        {/* <p className='text-md text-gray-400 px-2'>create free account</p> */}
                        <div className="mt-2 px-2 flex flex-col gap-3 lg:gap-5">
                            
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-md font-semibold'>Email</label>
                                <input type="email" className='p-2 rounded-sm bg-gray-100 focus:border-green-100 focus:border outline-none' placeholder='Email address' id='mail' onChange={handleChange} required/>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-md font-semibold'>Password</label>
                                <input type="password" className='p-2 rounded-sm  bg-gray-100 focus:border-green-100 focus:border outline-none' placeholder='password' onChange={handleChange} id='pass'   required/>
                            </div>
                            <div className=" flex flex-col gap-2 mt-2">
                                <button type='submit' className='bg-[#24ae7c] rounded-md px-3 py-2 font-semibold text-white shadow-sm'>Login</button>
                                <p className='text-sm text-gray-500'>Don't have an account ? <Link to={'/'} className='text-blue-500 '>Register</Link></p>
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

export default SignIn
