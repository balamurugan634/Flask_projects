import axios from 'axios';
import React, { useState } from 'react'
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
const AddEvent = () => {
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
            //   const data=await res.json()
            //   if (data.success===false){
            //     console.log(error)
            //   }
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
    <div className=''>
      <h1 className='text-2xl font-semibold pl-3'>Add events</h1>
      <p className='text-sm text-gray-500 pl-3'>To add events download the template using download button below and then upload the altered file in csv format to add event</p>
      <button onClick={handledownload} className='p-2 m-3 bg-green-600 rounded text-white font-semibold'>Download</button>
      <div>
          <h1  className='text-2xl font-semibold pl-3'>Upload CSV File</h1>
          <input type="file" accept=".csv" onChange={handleFileChange} className='m-2'/>
          <button onClick={handleUpload} className='text-white p-2 bg-blue-600 rounded'>Add</button>
          {message && <p className='pl-2'>{message}</p>}
        </div>
    </div>
  )
}

export default AddEvent
