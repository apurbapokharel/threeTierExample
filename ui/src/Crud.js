import React, { useState, useEffect } from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';
import MakeAdmin from './MakeAdmin';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import './Crud.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatus, clearToken, adminStatus } from './action/index';
import { validateToken } from './Apicaller';

function Crud() {
  const history = useHistory();
  const loggedStatus = useSelector(state => state.loggedStatus);
  const token = useSelector(state => state.token);
  const isAdmin = useSelector(state => state.adminStatus);
  const dispatch = useDispatch();

  useEffect(() => {
      const interval = setInterval(() => {
        validateToken(token)
          .catch(() => {
            clearInterval(interval);
            logout();
          })
      },2000);
}, []);


  const logout = () => {
    console.log("logout called");
    dispatch(toggleStatus());
    dispatch(clearToken());
    dispatch(adminStatus(false));
    history.push('/');
  }

  return (
    <div className="App">
      {!loggedStatus 
      ?
        null
      :
        <header className="App-header">
        <p>CRUD Demonstration</p>
        <Button onClick={logout}><p className="Logoff">Logout</p></Button>
        <br/>
        <div className="Crud">
          {
            isAdmin ?
            <>
              <Create/>
              <br/>
              <Read/>
              <br/>
              <Update/>
              <br/>
              <Delete/>
              <br/>
              <MakeAdmin/>
            </>
            :
            <>
              <Read/>
              <br/>
              <Delete/>
         </>
          }
          
        </div>
        </header>
      }
        
    </div>

  );
}

export default Crud;

