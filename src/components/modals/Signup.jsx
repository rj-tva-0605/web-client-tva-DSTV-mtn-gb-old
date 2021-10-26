
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './Signup.css';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {signupReducer} from '../../store/reducers/authReducer';




const Signup = ({showsignup, setShowSignup}) => {
    
  const dispatch = useDispatch();
  const history = useHistory();

  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const handleClose = (e) => setShowSignup(false);
  const handleMobileNumber = (e) => setMobileNumber(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    
    
  var data = JSON.stringify({
    "GENERATEOTP": {
      "MOBILEPHONE": mobilenumber,
      "otpemail": email,
      "PARTYID": "0",
      "COUNTRYCODE": "Guinea-Bissau",
      "RESEND": "TRUE",
      "ATTRIBUTE1": ""
    }
  });
    

    const signupfunc = (e) => {
      e.preventDefault();
      if (confirmPassword === password){
      dispatch(signupReducer(data))}
      else{console.log("password mismatch")}
      history.push({
        pathname:  "",
        
                 });


    }
    
    return (
      <div>      
        <Modal
          show={showsignup}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className = "signup-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
                <h1>Sign Up</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
             

             <form className="signup-form" onSubmit={signupfunc}>
                <div class="form-group">
                    <input type="text" class="form-control" value={mobilenumber} placeholder="080XXXXXXX" onChange={(e) => handleMobileNumber(e)}/>
                </div>
                <br /> 
                <div class="form-group">
                    <input type="text" class="form-control" value={email} placeholder="" onChange={(e) => handleEmail(e)}/>
                </div>
                <br /> 
                <div class="form-group">                    
                    <input type="text" class="form-control" value={password} placeholder="Password" onChange={(e) => handlePassword(e)}/>
                </div>
                <br /> 
                <div class="form-group">
                    <input type="text" class="form-control" value={confirmPassword}  placeholder="Confirm Password "  onChange={(e) => handleConfirmPassword(e)}/>
                </div>
                <br />
                <Button className= "rounded-sm shadow-none form-control" type="submit"  >Submit</Button>
                <br />
                <br />
            </form>
            <p className=" signup-link "><small>Already have an account?<a href="">Sign up now</a></small></p>
          </Modal.Body>
          
        </Modal>  
      </div>
    );
  }
  
  export default Signup;