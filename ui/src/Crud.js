import React, { useState, useEffect } from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import './Crud.css';

import { useSelector, useDispatch } from 'react-redux';
import { toggleStatus } from './action/index';

function Crud() {
  const history = useHistory();
  const loggedStatus = useSelector(state => state.loggedStatus);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(toggleStatus());
    history.push('/');
  }
  return (
    <div className="App">
      {!loggedStatus 
      ?
        <div>Access Denied</div>
      :
        <header className="App-header">
        <p>CRUD Demonstration {console.log(loggedStatus)}</p>
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
      }
        
    </div>

  );
}

export default Crud;

