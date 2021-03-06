import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { loginReq, registerReq, checkAdmin } from './Apicaller';
import { useHistory } from "react-router-dom";
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatus, assignToken, adminStatus } from './action/index';

function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loggedStatus = useSelector(state => state.loggedStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("logged status is",loggedStatus);
    }, []);

    const registerUser = () => {
        registerReq({"username": username, "password": password})
        .then(() => {ReactDOM.render(<>Successfully registered</>, document.getElementById("status"))})
        .catch(() => {ReactDOM.render(<>Username already registered</>, document.getElementById("status"))});
    }
  return (
    <div className="App">
      <header className="App-header">
        <p>CRUD Demonstration</p>
        <br/>
        <div className="Form">
            <form   onSubmit={(event) => {
            event.preventDefault();
            loginReq({"username": username, "password": password})
            .then((token) => {
                checkAdmin(token)
                .then((isAdmin) => {
                  dispatch(adminStatus(isAdmin));
                })
                .catch();
                try {
                    dispatch(toggleStatus());
                    dispatch(assignToken(token));

                } catch (error) {
                    console.log(error);
                }
                history.push('/crud')
            })
            .catch(() => {ReactDOM.render(<>Invalid Credentials</>, document.getElementById("status"))});

        }}>
                <TextField value={username} id="Username" label="Username" type="text" onChange={(e) => setUsername(e.target.value)} required/>
                <br/>
                <br/>
                <TextField value={password} id="Password" label="Password" type="password" onChange={(e) => setPassword(e.target.value)}required/>
                <br/>
                <br/>
                <Button variant="contained" color="default" type="submit"> Login </Button>
                &nbsp;
                <Button variant="contained" color="default" type="button" onClick={registerUser}> Register </Button>
            </form>
            <br/>
            <Typography id="status"></Typography>
        </div>
      </header>
    </div>

  );
}

export default Login;

