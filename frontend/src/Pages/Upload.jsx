import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
const Upload = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleFileChange = (event) => {
      setCsvFile(event.target.files[0]);
    };
    const handleUpload = async () => {
        if (!csvFile) {
          setMessage('Please select a CSV file.');
          return;
        }
    
        // Parse the CSV file
        Papa.parse(csvFile, {
          header: true,
          skipEmptyLines: true,
          complete: async (results) => {
            try {
              // Send data to the Flask API
              const response = await axios.post('http://localhost:5000/event/addevent', results.data);
              setMessage('File uploaded successfully!');
            } catch (error) {
              setMessage('Error uploading file: ' + error.message);
            }
          },
        });
      };
      return (
        <div>
          <h1>Upload CSV File</h1>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {message && <p>{message}</p>}
        </div>
      );
}

export default Upload


// const CsvUploader = () => {
//   const [csvFile, setCsvFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (event) => {
//     setCsvFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!csvFile) {
//       setMessage('Please select a CSV file.');
//       return;
//     }

//     // Parse the CSV file
//     Papa.parse(csvFile, {
//       header: true,
//       skipEmptyLines: true,
//       complete: async (results) => {
//         try {
//           // Send data to the Flask API
//           const response = await axios.post('http://your-flask-api-url/upload', results.data);
//           setMessage('File uploaded successfully!');
//         } catch (error) {
//           setMessage('Error uploading file: ' + error.message);
//         }
//       },
//     });
//   };

//   return (
//     <div>
//       <h1>Upload CSV File</h1>
//       <input type="file" accept=".csv" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CsvUploader;
