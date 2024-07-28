// src/pages/RetrieveInfo.js
import React, { useState } from 'react';
import './RetrieveInfo.css';

const RetrieveInfo = () => {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);

  const handleRetrieve = () => {
    const storedData = JSON.parse(localStorage.getItem('people')) || [];
    const match = storedData.find(p => p.aadhar === aadhar);
    setPerson(match || null);
  };

  return (
    <div className="RetrieveInfo">
      <input
        type="text"
        placeholder="Enter Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
      <button onClick={handleRetrieve}>Retrieve Information</button>

      {person ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        aadhar && <p>No match found</p>
      )}
    </div>
  );
};

export default RetrieveInfo;
