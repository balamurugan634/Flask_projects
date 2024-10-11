import React from 'react'

const AllTickets = ({data}) => {
    return (
        <div className="relative overflow-x-auto">
                <table className="w-full sm:max-w-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs bg-slate-800 text-white uppercase  ">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                                Sno
                            </th>
                            <th scope="col" className="px-6 py-3">
                                holder name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                event
                            </th>
                            <th scope="col" className="px-6 py-3">
                                date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                booker
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-slate-700'>
                        {data.map((item,i)=>( <tr className="bg-white border-b " key={i}>
                            <td className="px-6 py-4">
                            {i+1}
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                {item.holder_name}
                            </th>
                            <td className="px-6 py-4">
                            {item.phone}
                            </td>
                            <td className="px-6 py-4">
                            {item.event_title}
                            </td>
                            <td className="px-6 py-4">
                            {item.event_date}
                            </td>
                            <td className="px-6 py-4">
                            {item.name}
                            </td>
                        </tr>))}
                       
                       
                        
    
                    </tbody>
                </table>
            </div>
      )
}

export default AllTickets
