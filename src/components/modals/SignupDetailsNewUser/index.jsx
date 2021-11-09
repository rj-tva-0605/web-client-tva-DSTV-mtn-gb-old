
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './SignupDetailsNewUser.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {signupReducer} from '../../store/reducers/authReducer';
import ValidateOTPNewUser from '../ValidateOTPNewUser';




const SignupDetailsNewUser = ({showsignup, setShowSignup}) => {
    
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
            var config = {
              method: 'post',
              url: 'https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/GenerateOTP?ReferenceNo=17412xzs123abcwwwqsrtdq',
              headers: { 
                'username': 'MTNGBUCWEBUSR', 
                'password': 'Mtngbpass@1234', 
                'Externalparty': 'tvanywhere-mtngb', 
                'content-Type': 'application/json',
                'content-type' : 'application/json; charset=utf-8',
                'accept' : 'application/json, text/plain, /',
                'accept-language' : 'en-US,en;q=0.9',
                'content-type' : 'application/json',
              },
              data : data
            };    
          
              axios(config)
              .then((response) => {

                // dispatch(signupReducer(data))
                console.log("signup details in auth reducer ", response.data)
              })
              .catch(error => {
                console.error(`Error: ${error}`);
                dispatch(signupError());
                console.log("now logged out on csms we can now logout on app");
          
                    });
          
    }
      else{console.log("password mismatch")}
      history.push({
        pathname:  "",
        
                 });


    }

    const verifyUserExistsfunc = (e) => {
      e.preventDefault();
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
             

             <form className="signup-form" onSubmit={verifyUserExistsfunc}>
                <div class="form-group">
                    <input type="text" class="form-control" value={mobilenumber} placeholder="966XXXXXXXX" onChange={(e) => handleMobileNumber(e)}/>
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
  
  export default SignupDetailsNewUser;