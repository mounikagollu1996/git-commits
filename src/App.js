import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [key, setKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(key);
    localStorage.setItem('authKey', key);
    setKey('');
  };
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value) }}
          placeholder='Enter Github auth key'
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
