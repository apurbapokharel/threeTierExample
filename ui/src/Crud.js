import React from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import './Crud.css';

function Crud() {
  const history = useHistory();
  const logout = () => {
    history.push('/');
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>CRUD Demonstration</p>
        <Button onClick={logout}>Logout</Button>
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

export default Crud;

