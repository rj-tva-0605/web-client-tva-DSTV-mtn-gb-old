
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './VerifyUserExistRegister.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {signupReducer} from '../../../store/reducers/authReducer';




const VerifyUserExistRegister = ({showVerifyUserExist, setShowVerifyUserExist}) => {
    
  const dispatch = useDispatch();
  const history = useHistory();

  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword]= useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const handleClose = (e) => setShowVerifyUserExist(false);
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
    

  

    const verifyUserExistsfunc = (e) => {
      e.preventDefault();
      if (confirmPassword === password){
          var data = JSON.stringify({
            "KEY_NAMEVALUE": {
              "KEY_NAME": "PROCESS",
              "KEY_VALUE": "GETUSERID"
            },
            "ADDITIONAL_INFO": "{'ENTITYCODE':'MTNGB','MOBILENO':'02123456789'}"
          });

          var config = {
            method: 'post',
            url: 'https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/GetRecordsBySearch?ReferenceNo=17412xzs123abcwwwqsrtdq43wq764832732',
            headers: { 
              'Username': 'MTNGBUCWEBUSR', 
              'Password': 'Mtngbpass@1234', 
              'Externalparty': 'tvanywhere-mtngb', 
              'Content-Type': 'application/json'
            },
            data : data
          };

          axios(config)
          .then(function (response) {
            console.log("this is from verify if user exists", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });}
      else{console.log("password mismatch")}
          history.push({
            pathname:  "",
            
                    });
      setShowVerifyUserExist("donenextprocess")
    }

    

    
    return (
      <div>      
        <Modal
          show={showVerifyUserExist}
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
             

             <form className="signup-form" onSubmit={verifyUserExistsfunc}>
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
  
  export default VerifyUserExistRegister;