// src/pages/AddPerson.js
import React, { useState } from 'react';
import './AddPerson.css';

const AddPerson = () => {
  const [rows, setRows] = useState([]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    if (name === 'dob') {
      updatedRows[index].age = calculateAge(value);
    }
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { name: '', dob: '', aadhar: '', mobile: '', age: '', saved: false }]);
  };  

  const saveRow = (index) => {
    const updatedRows = [...rows];
    const row = updatedRows[index];
    if (row.name && row.dob && row.aadhar.length === 12 && row.mobile.length === 10) {
      const storedData = JSON.parse(localStorage.getItem('people')) || [];
      storedData.push(row);
      localStorage.setItem('people', JSON.stringify(storedData));
      updatedRows[index].saved = true;
      alert("Information saved sucessfully")
    } else {
      alert('Please fill out all fields correctly.');
    }
    setRows(updatedRows);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    if (updatedRows[index].saved) {
      const storedData = JSON.parse(localStorage.getItem('people')) || [];
      const filteredData = storedData.filter((_, i) => i !== index);
      localStorage.setItem('people', JSON.stringify(filteredData));
    }
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    alert("Information Delete")
  };

  return (
    <div className="AddPerson">
      <button onClick={addRow}>Add New Person</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" name="name" value={row.name} onChange={(e) => handleChange(e, index)} /></td>
              <td><input type="date" name="dob" value={row.dob} onChange={(e) => handleChange(e, index)} /></td>
              <td><input type="text" name="aadhar" value={row.aadhar} onChange={(e) => handleChange(e, index)} /></td>
              <td><input type="text" name="mobile" value={row.mobile} onChange={(e) => handleChange(e, index)} /></td>
              <td>{row.age}</td>
              <td>
                {!row.saved ? (
                  <button onClick={() => saveRow(index)}>Save</button>
                ) : (
                  <button onClick={() => deleteRow(index)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPerson;
