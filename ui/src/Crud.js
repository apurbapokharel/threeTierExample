import React, { useState, useEffect } from 'react';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Delete from './Delete';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import './Crud.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatus, clearToken } from './action/index';
import { validateToken } from './Apicaller';

function Crud() {
  const history = useHistory();
  const loggedStatus = useSelector(state => state.loggedStatus);
  const token = useSelector(state => state.token);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  // console.log(token, isAdmin);

  useEffect(() => {
    if(!isTokenExpired){
      setInterval(() => {
        validateToken(token)
          .then((isAdmin) => {
            setIsAdmin(isAdmin);
          }).
          catch(() => {
            logout();
          })
      },2000);
    }
}, []);

  const dispatch = useDispatch();

  const logout = () => {
    setIsTokenExpired(true);
    setIsAdmin(false);
    dispatch(toggleStatus());
    dispatch(clearToken());
    history.push('/');
  }

  return (
    <div className="App">
      {!loggedStatus 
      ?
        window.alert("Access Denied")
      :
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
      }
        
    </div>

  );
}

export default Crud;

