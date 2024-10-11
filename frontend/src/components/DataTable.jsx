
import React from 'react'

const DataTable = ({data}) => {
     

    return (


        <div className="relative overflow-x-auto">
            <table className="w-full sm:max-w-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-slate-800 uppercase  text-white">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                           Sno
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mail
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                       
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,i)=>( <tr className="bg-white border-b " key={i}>
                        <td className="px-6 py-4">
                            {i+1}
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                            {item.name}
                        </th>
                        <td className="px-6 py-4">
                            {item.mail}
                        </td>
                        <td className="px-6 py-4">
                            {item.phone}
                        </td>
                       
                    </tr>))}
                   
                   

                </tbody>
            </table>
        </div>

    )
}

export default DataTable
