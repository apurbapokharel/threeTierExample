import React from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <p>CRUD Demonstration</p>
        <br/>
        <div className="Crud">
          <Create/>
          <br/>
          <Read/>
          <br/>
          <Update/>
          <br/>
          <Delete/>
        </div>
      </header>
    </div>

  );
}

export default App;

