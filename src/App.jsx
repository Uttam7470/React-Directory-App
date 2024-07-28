// src/App.js
import React, { useState } from 'react';
import AddPerson from './pages/AddPerson';
import RetrieveInfo from './pages/RetrieveInfo';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="App">
      <header>
        <button onClick={() => setActiveTab('add')}>Add New Person</button>
        <button onClick={() => setActiveTab('retrieve')}>Retrieve Information</button>
      </header>
      <main>
        {activeTab === 'add' ? <AddPerson /> : <RetrieveInfo />}
      </main>
    </div>
  );
}

export default App;
