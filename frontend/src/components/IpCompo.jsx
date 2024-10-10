import React from 'react'

const IpCompo = () => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="" className='text-md font-semibold'>Password</label>
            <input type="password" className='p-2 rounded-sm  bg-gray-100 focus:border-green-100 focus:border outline-none' placeholder='password' onChange={handleChange} id='pass' required />
        </div>
    )
}

export default IpCompo
