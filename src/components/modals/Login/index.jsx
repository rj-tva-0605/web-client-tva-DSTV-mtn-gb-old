
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './Login.css';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {loginReducer} from '../../../store/reducers/authReducer';
import { useHistory } from 'react-router';




//handle username and password slots autofill device class and device 
//use navigator.appname

// pick data from form send  package as data and send with axios 





const Login = ({
                showlogin, setShowLogin, 
                showForgPsswdModal, setShowForgPsswdModal}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const history = useHistory()

    const messageLoginError = useSelector(state =>state.auth.messageLoginError)
    const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn)



    // modal show and hide 
    const handleClose = () => setShowLogin(false);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    var data = JSON.stringify({
      "username": username,
      "password": password,
      "device": "rodney",
      "device_class": "desktop"
    });
    

    const loginfunc = (e) => {
      e.preventDefault();

      dispatch(loginReducer(data))
      // check if operator uid is mtngb if not make redirect to homepage
      // set unset loginor different action so there will be no login action
    
      //settimeout 
      setTimeout(function(){ 
        history.push({
          pathname:  `/`,
      
                 });
      }, 8000);
      
      
    }

      const forgotPassfunc = (e) =>{
        e.preventDefault();
        setShowLogin(false)
        setTimeout(() => {setShowForgPsswdModal(true)}, 600);
      }
    

    
    

    return (
      <div>
  
        <Modal
          show={showlogin}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="login-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <h1>Login</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <br />
             <br />
             <br />
             <form onSubmit = {loginfunc}>
                <div class="form-group">
                    <input type="text" class="form-control" value={username} placeholder="Username e.g. 966XXXXXXX" onChange={(e) => handleUsername(e)}/>
                </div>
                <br /> 
                <div class="form-group">
                    <input type="text" class="form-control" value={password} placeholder="Password" onChange={(e) => handlePassword(e)} />
                </div>
                <br /> 
                <Button className= "rounded-sm shadow-none form-control" type="submit" >Submit</Button>
                
                <br />
            </form>
            <br />
            <a  className="forget-pass" onClick={forgotPassfunc}> Forgot Password</a>
            <br/>
            <p className=" login-link "><small>New to MTN-GB?<a href="">Sign up now</a></small></p>

          </Modal.Body>

        </Modal>
      </div>
    );
  }
  
  export default Login;