import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         CRUD react
        </p>
       <div className="container">
         <h2 className="text-center p-4">Todos App</h2>
         <ul className="list-group">
           <li className="list-group-item text-dark" >ME LEARNING STYFF</li>
         </ul>
       </div>
      </header>
    </div>
  );
}

export default App;
