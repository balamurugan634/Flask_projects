import axios from 'axios';
import React, { useRef, useState } from 'react'
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import upload1 from '../assets/up1.png'
import { FaDownload } from 'react-icons/fa6';
const AddEvent = () => {
  const fileref = useRef(null);
    const [csvFile, setCsvFile] = useState(null);
    const [message, setMessage] = useState('');
    const navigate=useNavigate()
    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
      };
      const handleUpload = async () => {
        console.log("working")
        if (!csvFile) {
          setMessage('Please select a CSV file.');
          return;
        }
    
      
        Papa.parse(csvFile, {
          header: true,
          skipEmptyLines: true,
          complete: async (results) => {
            try {
                console.log(results.data)
              const res = await axios.post('http://localhost:5000/event/addevent', results.data);
              setMessage('File uploaded successfully!');
          
              navigate('/dashboard/allevents')
            } catch (error) {
              setMessage('Error uploading file: ' + error.message);
            }
          },
        });
      };
  const  handledownload=async()=>{
    try {
        const response = await axios.get('http://localhost:5000/event/download', {
            responseType: 'blob',
          });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
         
        return
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl text-center mt-5 text-slate-800 uppercase font-semibold '>Add events</h1>
      <p className='text-sm text-center mt-2 text-gray-500 '>To add events download the template using download button below and then upload the altered file in csv format to add event</p>
      <button onClick={handledownload} className='p-4 my-3 self-center bg-green-600 rounded text-white font-semibold'><FaDownload /></button>
      <div className="">
        <p className='font-semibold'>Point to Remember:</p>
        <li>Download the excel file using download above</li>
        <li>Edit the excel file enter the details of event in predefined fields</li>
        <li>export in csv format</li>
        <li>upload the csv file below</li></div>
        <div className='flex flex-col items-center'>
          <h1  className='text-2xl mt-3 text-center font-semibold pl-3'>Upload CSV File</h1>
          {/* <input type="file" accept=".csv" onChange={handleFileChange} className='m-2'/>
          <button onClick={handleUpload} className='text-white p-2 bg-blue-600 rounded'>Add</button>
          {message && <p className='pl-2'>{message}</p>} */}
           <input
          type="file"
          name=""
          id="pic"
          ref={fileref}
          onChange={handleFileChange}
          hidden
          accept=".csv"
        />
        <img
          src={upload1}
          onClick={() => fileref.current.click()}
          className=" w-24 h-24 object-cover rounded-full cursor-pointer "
          alt=""
        />
        <h3 className='mx-3'>upload only csv files</h3>
        </div>
    </div>
  )
}

export default AddEvent
