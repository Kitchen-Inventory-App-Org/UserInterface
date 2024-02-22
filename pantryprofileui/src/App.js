import React from 'react';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Kitchen Table</h1>
      </div>
      <div className="container">
        <input type="text" className="search-bar" placeholder="Search..." />
        <div className="dropdown">
          <button className="dropbtn">Inventory</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
