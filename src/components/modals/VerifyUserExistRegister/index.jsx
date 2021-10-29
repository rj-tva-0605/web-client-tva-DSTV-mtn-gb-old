// validate user exist and generate OTP


import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import  './VerifyUserExistRegister.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {signupReducer} from '../../../store/reducers/authReducer';




const VerifyUserExistRegister = ({
                                  showVerifyUserExist, 
                                  setShowVerifyUserExist,
                                  setPassVerifyNumber,

                                }) => {
  
  const getDateTimeUniqueString = () => {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+month+day+hour+minute+second; 
    let  uniquestring= String(dateTime)
  
     return uniquestring;
}


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
    
    
  
    

  

    const verifyUserExistsfunc = (e) => {
      e.preventDefault();
      let uniquestring = getDateTimeUniqueString()
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
            url: `https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/GetRecordsBySearch?ReferenceNo=17412xzs123${uniquestring}YpjWMi5p0FEEytp`,
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
            //OTP function genrated here
            setPassVerifyNumber(mobilenumber)
            generateOTPfunc()
            console.log("ERROR NO STATUS CODE LOOK in Messages", response.data.RESPONSEINFO.ERRORNO)
          })
          .catch(function (error) {
            console.log(error);
          });}
      else{console.log("password mismatch")}
          history.push({
            pathname:  "",
            
                    });
      setShowVerifyUserExist("verifyuserdonenextprocess")
    }


    const generateOTPfunc = () => {

      let uniquestring = getDateTimeUniqueString()
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

      var config = {
        method: 'post',
        url: `https://tvanywheretest-ott.magnaquest.com/webapi/Restapi/GenerateOTP?ReferenceNo=174${uniquestring}wwwqsrtdq43wq764832`,
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
        console.log("Generate  Otp function ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      // setOtp(new Array(6).fill(""))

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
                <h1>Verify User</h1>
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